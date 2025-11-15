"use client";

import { RealtimeMessage } from "@/components/realtime-message";
import { getDesktopURL } from "@/lib/e2b/utils";
import { useScrollToBottom } from "@/lib/use-scroll-to-bottom";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AISDKLogo } from "@/components/icons";
import { PromptSuggestions } from "@/components/prompt-suggestions";
import { RealtimeSession } from "@/lib/realtime-session";

export default function Chat() {
  const [desktopContainerRef, desktopEndRef] = useScrollToBottom();
  const [mobileContainerRef, mobileEndRef] = useScrollToBottom();
  const [isControlUnlocked, setIsControlUnlocked] = useState(false);

  const sessionRef = useRef<RealtimeSession | undefined>(undefined);

  if (!sessionRef.current) {
    sessionRef.current = new RealtimeSession({
      api: "/api/chat",
      onError: (error) => {
        console.error(error);
        toast.error("There was an error", {
          description: "Please try again later.",
          richColors: true,
          position: "top-center",
        });
      },
    });
  }

  const session = sessionRef.current;

  const state = useSyncExternalStore(
    session.subscribe,
    session.getSnapshot,
    session.getSnapshot,
  );

  const { messages, input, status, isInitializing, streamUrl } = state;
  const isLoading = status !== "ready";

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    session.setInput(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    session.sendMessage(session.getSnapshot().input, { clearInput: true });
  };

  const handlePromptSubmit = (prompt: string) => {
    session.sendMessage(prompt);
  };

  const refreshDesktop = async () => {
    try {
      session.setInitializing(true);
      const snapshot = session.getSnapshot();
      const { streamUrl, id } = await getDesktopURL(snapshot.sandboxId || undefined);
      session.updateDesktop({ streamUrl, sandboxId: id });
    } catch (err) {
      console.error("Failed to refresh desktop:", err);
    } finally {
      session.setInitializing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        session.setInitializing(true);
        const { streamUrl, id } = await getDesktopURL(undefined);
        session.updateDesktop({ streamUrl, sandboxId: id });
      } catch (err) {
        console.error("Failed to initialize desktop:", err);
        toast.error("Failed to initialize desktop");
      } finally {
        session.setInitializing(false);
      }
    };

    init();
  }, [session]);

  useEffect(() => {
    const { sandboxId } = session.getSnapshot();
    if (!sandboxId) return;

    const killDesktop = () => {
      const currentSandboxId = session.getSnapshot().sandboxId;
      if (!currentSandboxId) return;
      navigator.sendBeacon(
        `/api/kill-desktop?sandboxId=${encodeURIComponent(currentSandboxId)}`,
      );
    };

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS || isSafari) {
      window.addEventListener("pagehide", killDesktop);
      return () => {
        window.removeEventListener("pagehide", killDesktop);
        killDesktop();
      };
    } else {
      window.addEventListener("beforeunload", killDesktop);
      return () => {
        window.removeEventListener("beforeunload", killDesktop);
        killDesktop();
      };
    }
  }, [session, state.sandboxId]);

  return (
    <div className="flex h-dvh relative">
      <div className="hidden xl:flex w-full">
        <div className="w-96 flex flex-col border-r border-border">
          <div className="bg-background py-2 px-4 flex justify-between items-center">
            <AISDKLogo />
          </div>

          <div
            className="flex-1 space-y-2 py-4 overflow-y-auto px-4 hide-scrollbar"
            ref={desktopContainerRef}
          >
            {messages.map((message, i) => (
              <RealtimeMessage
                message={message}
                key={message.id}
                isLoading={isLoading}
                status={status}
                isLatestMessage={i === messages.length - 1}
              />
            ))}
            <div ref={desktopEndRef} className="pb-2" />
          </div>

          {messages.length === 0 && (
            <PromptSuggestions
              disabled={isInitializing}
              submitPrompt={handlePromptSubmit}
            />
          )}
          <div className="bg-background">
            <form onSubmit={handleFormSubmit} className="p-4">
              <Input
                handleInputChange={handleInputChange}
                input={input}
                isInitializing={isInitializing}
                isLoading={isLoading}
                status={status}
                stop={() => session.stop()}
              />
            </form>
          </div>
        </div>

        <div className="flex-1 bg-black relative">
          {streamUrl ? (
            <>
              <iframe
                src={streamUrl}
                className="w-full h-full absolute inset-0"
                style={{
                  pointerEvents: isControlUnlocked ? "auto" : "none",
                }}
                allow="autoplay; clipboard-read; clipboard-write; camera; microphone; geolocation"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads"
              />
              {!isControlUnlocked && (
                <div className="absolute inset-0 bg-transparent cursor-not-allowed z-[5]" />
              )}
              <Button
                onClick={() => setIsControlUnlocked(!isControlUnlocked)}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded z-10"
                title={isControlUnlocked ? "Zablokuj sterowanie" : "Odblokuj sterowanie"}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={isControlUnlocked ? "opacity-100" : "opacity-50"}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.8828 9.61914L11.043 9.66309L17.5928 11.9746C18.5062 12.297 18.5682 13.565 17.6904 13.9746L15.1562 15.1562L13.9746 17.6904C13.5906 18.5132 12.4525 18.5107 12.0459 17.7549L11.9746 17.5928L9.66309 11.043C9.37952 10.2395 10.087 9.46376 10.8828 9.61914ZM13.0264 16.5771L13.9902 14.5127L14.0342 14.4287C14.1447 14.2377 14.3114 14.0842 14.5127 13.9902L16.5771 13.0264L11.0889 11.0889L13.0264 16.5771Z"></path>
                  <path d="M11.877 2.66797C12.6428 2.66797 13.2514 2.6677 13.7432 2.70117C14.2406 2.73507 14.6684 2.80642 15.0684 2.97168C16.0498 3.37749 16.8295 4.15725 17.2354 5.13867C17.4007 5.53864 17.4719 5.9664 17.5059 6.46387C17.5393 6.95561 17.5391 7.56423 17.5391 8.33008C17.5389 8.6972 17.2412 8.99512 16.874 8.99512C16.507 8.99499 16.2092 8.69712 16.209 8.33008C16.209 7.5461 16.2084 6.99077 16.1787 6.55469C16.1494 6.12491 16.0941 5.85875 16.0068 5.64746C15.7359 4.99227 15.2148 4.47101 14.5596 4.2002C14.3483 4.11298 14.0821 4.05758 13.6523 4.02832C13.2163 3.99864 12.6609 3.99805 11.877 3.99805H8.45703C7.513 3.99805 6.84463 3.99834 6.32227 4.04102C5.80769 4.08307 5.4932 4.16316 5.24609 4.28906C4.74409 4.54487 4.33589 4.95307 4.08008 5.45508C3.95417 5.70219 3.87409 6.01668 3.83203 6.53125C3.78936 7.05361 3.78906 7.72198 3.78906 8.66602V11.4609C3.78906 12.344 3.78969 12.9693 3.82715 13.459C3.8641 13.9416 3.9345 14.2387 4.04492 14.4727C4.30898 15.0316 4.75938 15.4821 5.31836 15.7461C5.55226 15.8565 5.8487 15.9269 6.33105 15.9639C6.57587 15.9826 6.85484 15.9913 7.18262 15.9961L8.33008 16.001L8.46387 16.0146C8.76669 16.0766 8.99485 16.3449 8.99512 16.666C8.99512 16.9873 8.76681 17.2553 8.46387 17.3174L8.33008 17.3311L7.16309 17.3262C6.81513 17.321 6.5056 17.3102 6.22949 17.2891C5.67023 17.2462 5.19176 17.1568 4.75 16.9482C3.91222 16.5525 3.23744 15.8779 2.8418 15.04C2.63332 14.5983 2.54379 14.1198 2.50098 13.5605C2.45813 13.006 2.45833 12.3176 2.45898 11.3672V8.6875C2.45833 7.57763 2.45808 6.77802 2.51172 6.1377C2.56641 5.48685 2.68131 4.94141 2.92969 4.43164C3.33485 3.5772 4.0112 2.90098 4.86563 2.49582C5.37555 2.24743 5.92084 2.13253 6.57168 2.07785C7.21192 2.0242 8.01153 2.02445 9.12139 2.02509L11.877 2.66797Z"></path>
                </svg>
              </Button>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              {isInitializing ? "Initializing desktop..." : "Loading stream..."}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full xl:hidden">
        <div className="bg-background py-2 px-4 flex justify-between items-center">
          <AISDKLogo />
        </div>

        <div
          className="flex-1 space-y-2 py-4 overflow-y-auto px-4 hide-scrollbar"
          ref={mobileContainerRef}
        >
          {messages.map((message, i) => (
            <RealtimeMessage
              message={message}
              key={message.id}
              isLoading={isLoading}
              status={status}
              isLatestMessage={i === messages.length - 1}
            />
          ))}
          <div ref={mobileEndRef} className="pb-2" />
        </div>

        {messages.length === 0 && (
          <PromptSuggestions
            disabled={isInitializing}
            submitPrompt={handlePromptSubmit}
          />
        )}
        <div className="bg-background">
          <form onSubmit={handleFormSubmit} className="p-4">
            <Input
              handleInputChange={handleInputChange}
              input={input}
              isInitializing={isInitializing}
              isLoading={isLoading}
              status={status}
              stop={() => session.stop()}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
