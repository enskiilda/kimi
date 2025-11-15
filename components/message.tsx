"use client";

import type { ComponentType } from "react";
import { useRef } from "react";
import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";
import { Loader2, Check, X, ScrollText, Monitor } from 'lucide-react';

const PressKeyIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.8828 9.61914L11.043 9.66309L17.5928 11.9746C18.5062 12.297 18.5682 13.565 17.6904 13.9746L15.1562 15.1562L13.9746 17.6904C13.5906 18.5132 12.4525 18.5107 12.0459 17.7549L11.9746 17.5928L9.66309 11.043C9.37952 10.2395 10.087 9.46376 10.8828 9.61914ZM13.0264 16.5771L13.9902 14.5127L14.0342 14.4287C14.1447 14.2377 14.3114 14.0842 14.5127 13.9902L16.5771 13.0264L11.0889 11.0889L13.0264 16.5771ZM11.877 2.66797C12.6428 2.66797 13.2514 2.6677 13.7432 2.70117C14.2406 2.73507 14.6684 2.80642 15.0684 2.97168C16.0498 3.37749 16.8295 4.15725 17.2354 5.13867C17.4007 5.53864 17.4719 5.9664 17.5059 6.46387C17.5393 6.95561 17.5391 7.56423 17.5391 8.33008C17.5389 8.6972 17.2412 8.99512 16.874 8.99512C16.507 8.99499 16.2092 8.69712 16.209 8.33008C16.209 7.5461 16.2084 6.99077 16.1787 6.55469C16.1494 6.12491 16.0941 5.85875 16.0068 5.64746C15.7359 4.99227 15.2148 4.47101 14.5596 4.2002C14.3483 4.11298 14.0821 4.05758 13.6523 4.02832C13.2163 3.99864 12.6609 3.99805 11.877 3.99805H8.45703C7.513 3.99805 6.84463 3.99834 6.32227 4.04102C5.80769 4.08307 5.4932 4.16316 5.24609 4.28906C4.74409 4.54487 4.33589 4.95307 4.08008 5.45508C3.95417 5.70219 3.87409 6.01668 3.83203 6.53125C3.78936 7.05361 3.78906 7.72198 3.78906 8.66602V11.4609C3.78906 12.344 3.78969 12.9693 3.82715 13.459C3.8641 13.9416 3.9345 14.2387 4.04492 14.4727C4.30898 15.0316 4.75938 15.4821 5.31836 15.7461C5.55226 15.8565 5.8487 15.9269 6.33105 15.9639C6.57587 15.9826 6.85484 15.9913 7.18262 15.9961L8.33008 16.001L8.46387 16.0146C8.76669 16.0766 8.99485 16.3449 8.99512 16.666C8.99512 16.9873 8.76681 17.2553 8.46387 17.3174L8.33008 17.3311L7.16309 17.3262C6.81513 17.321 6.5056 17.3102 6.22949 17.2891C5.67023 17.2462 5.19176 17.1568 4.75 16.9482C3.91222 16.5525 3.23744 15.8779 2.8418 15.04C2.63332 14.5983 2.54379 14.1198 2.50098 13.5605C2.45873 13.0083 2.45898 12.3236 2.45898 11.4609V8.66602C2.45898 7.74384 2.45871 7.01193 2.50684 6.42285C2.5556 5.82619 2.65735 5.31727 2.89453 4.85156C3.27785 4.0993 3.89032 3.48684 4.64258 3.10352C5.10828 2.86633 5.6172 2.76459 6.21387 2.71582C6.80295 2.66769 7.53485 2.66797 8.45703 2.66797H11.877ZM7.13379 10.3486C7.43692 10.4106 7.66504 10.6786 7.66504 11C7.66504 11.3214 7.43692 11.5894 7.13379 11.6514L7 11.665H6C5.63273 11.665 5.33496 11.3673 5.33496 11C5.33496 10.6327 5.63273 10.335 6 10.335H7L7.13379 10.3486ZM6.7793 6.7793C7.00657 6.55203 7.35808 6.52383 7.61621 6.69434L7.7207 6.7793L8.4707 7.5293L8.55566 7.63379C8.72617 7.89192 8.69797 8.24343 8.4707 8.4707C8.24343 8.69797 7.89192 8.72617 7.63379 8.55566L7.5293 8.4707L6.7793 7.7207L6.69434 7.61621C6.52383 7.35808 6.55203 7.00657 6.7793 6.7793ZM11 5.33496C11.3673 5.33496 11.665 5.63273 11.665 6V7C11.665 7.36727 11.3673 7.66504 11 7.66504C10.6327 7.66504 10.335 7.36727 10.335 7V6C10.335 5.63273 10.6327 5.33496 11 5.33496Z"></path>
  </svg>
);

const KeyboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-keyboard-icon lucide-keyboard"><path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>
);

const ScreenshotIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-images-icon lucide-images"><path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/></svg>
);

const MousePointerClickIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/></svg>
);

const SplinePointerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/></svg>
);

const TimerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer-icon lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
);

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  parts?: Array<
    | { type: "text"; text: string }
    | {
        type: "tool-invocation";
        toolInvocation: {
          toolCallId: string;
          toolName?: string;
          state: "streaming" | "call" | "result";
          args?: Record<string, any>;
          argsText?: string;
          result?: any;
        };
      }
  >;
};

type PreviewMessageProps = {
  message: Message;
  status: "error" | "submitted" | "streaming" | "ready";
  isLatestMessage: boolean;
  isLoading: boolean;
};

type ComputerActionDescriptor = {
  label: string;
  detail?: string;
  icon: ComponentType<{ className?: string }> | null;
  showSkeleton?: boolean;
};

const ABORTED = 'aborted';

const streamingSpinner = (
  <Loader2 className="h-3.5 w-3.5 animate-spin text-black" aria-hidden="true" />
);

const idleSpinner = (
  <div className="h-1.5 w-1.5 rounded-full bg-zinc-200" aria-hidden="true" />
);

const abortedIcon = (
  <X className="h-3.5 w-3.5 text-zinc-300" aria-hidden="true" />
);

const completedIcon = (
  <Check className="h-3.5 w-3.5 text-black" aria-hidden="true" />
);

function describeComputerAction(part: any) {
  const { args = {} } = part.toolInvocation;
  const action = args?.action;

  switch (action) {
    case "screenshot":
      return { label: "Screenshot", icon: ScreenshotIcon };
    case "type":
      return {
        label: "Type",
        detail: args?.text ? `"${args.text}"` : "...",
        icon: KeyboardIcon,
      };
    case "key":
      return {
        label: "Press",
        detail: args?.text ? `<${args.text}>` : "...",
        icon: PressKeyIcon,
      };
    case "wait":
      return {
        label: "Wait",
        detail: args?.duration ? `${args.duration}s` : "...",
        icon: TimerIcon,
      };
    case "left_click":
      return {
        label: "Click",
        detail: args?.coordinate ? `${args.coordinate[0]}×${args.coordinate[1]}` : "...",
        icon: MousePointerClickIcon,
      };
    case "scroll":
      return {
        label: "Scroll",
        detail: args?.scroll_direction ? `${args.scroll_direction}` : "...",
        icon: SplinePointerIcon,
      };
    default:
      return { label: "System", icon: Monitor };
  }
}

function renderInvocationStatus(state: string, isLatestMessage: boolean, chatStatus: string, result: any) {
  if (state === "streaming") return streamingSpinner;
  if (state === "call") return isLatestMessage && chatStatus !== "ready" ? streamingSpinner : <div className="h-1.5 w-1.5 rounded-full bg-zinc-200" />;
  if (state === "result") {
    if (result === ABORTED || result?.status === "aborted") return abortedIcon;
    return completedIcon;
  }
  return null;
}

interface ComputerInvocationProps {
  part: any;
  isLatestMessage: boolean;
  status: string;
}

export function ComputerInvocation({ part, isLatestMessage, status }: ComputerInvocationProps) {
  const descriptor = describeComputerAction(part);
  const IconComponent = descriptor.icon;
  const { state, result } = part.toolInvocation;
  
  const hasScreenshot = state === "result" && 
                        typeof result === 'object' && 
                        result !== null && 
                        'type' in result && 
                        result.type === "image" && 
                        'data' in result;

  return (
    <div 
      className={`
        group relative flex w-full transition-all
        ${hasScreenshot 
          ? 'flex-col gap-4 rounded-[32px] bg-zinc-50 p-6 hover:bg-zinc-100' 
          : 'flex-row items-center gap-5 rounded-full bg-zinc-50 px-6 py-4 hover:bg-zinc-100'
        }
      `}
    >
      {/* Header Row */}
      <div className={`flex items-center gap-4 ${hasScreenshot ? 'w-full' : 'flex-1'}`}>
        {/* Icon - clean without container */}
        <div className="text-black [&>svg]:w-5 [&>svg]:h-5">
          {IconComponent ? <IconComponent className="w-5 h-5" strokeWidth={2} /> : null}
        </div>
        
        {/* Content */}
        <div className="flex flex-1 items-center gap-3 overflow-hidden min-w-0">
          <span className="text-sm font-medium text-black">
            {descriptor.label}
          </span>
          {descriptor.detail ? (
            <span className="truncate text-xs text-zinc-400 font-mono">
              {descriptor.detail}
            </span>
          ) : null}
        </div>
        
        {/* Status */}
        <div className="flex items-center justify-center ml-auto">
          {renderInvocationStatus(state, isLatestMessage, status, result)}
        </div>
      </div>

      {/* Screenshot */}
      {hasScreenshot ? (
        <div className="relative w-full overflow-hidden rounded-[24px] bg-white">
          <img
            src={
              typeof result.data === 'string' && result.data.startsWith("data:")
                ? result.data
                : typeof result.data === 'string' && result.data.startsWith("/")
                ? result.data
                : `data:image/png;base64,${result.data}`
            }
            alt="Screenshot"
            className="w-full object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}

function BashInvocation({
  part,
  isLatestMessage,
  status,
}: {
  part: Extract<NonNullable<Message["parts"]>[number], { type: "tool-invocation" }>;
  isLatestMessage: boolean;
  status: PreviewMessageProps["status"];
}) {
  const { args = {}, argsText, state, result } = part.toolInvocation;
  const command = args?.command as string | undefined;
  const displayCommand = argsText?.trim()?.length
    ? argsText.trim().slice(0, 80)
    : command
      ? command.slice(0, 80)
      : "...";

  const statusIcon = renderInvocationStatus(state, isLatestMessage, status, result);

  return (
    <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
        <ScrollText className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col">
          <span className="font-mono text-sm font-medium">
            {state === "streaming" ? "Generating command" : "Running command"}
          </span>
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{displayCommand}</span>
        </div>
      </div>
      <div className="flex h-5 w-5 items-center justify-center">{statusIcon}</div>
    </div>
  );
}

function GenericInvocation({
  part,
  isLatestMessage,
  status,
}: {
  part: Extract<NonNullable<Message["parts"]>[number], { type: "tool-invocation" }>;
  isLatestMessage: boolean;
  status: PreviewMessageProps["status"];
}) {
  const { toolName = "tool", state, args, result } = part.toolInvocation;
  const statusIcon = renderInvocationStatus(state, isLatestMessage, status, result);

  return (
    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center2 gap-3">
        <div className="font-mono text-xs uppercase text-zinc-500">{toolName}</div>
        <div className="ml-auto flex h-5 w-5 items-center justify-center">{statusIcon}</div>
      </div>
      <pre className="mt-2 overflow-x-auto rounded bg-zinc-900/5 p-3 text-xs text-zinc-700 dark:bg-white/5 dark:text-zinc-200">
        {JSON.stringify(args, null, 2)}
      </pre>
    </div>
  );
}

function renderToolInvocation(part: Extract<NonNullable<Message["parts"]>[number], { type: "tool-invocation" }>, props: PreviewMessageProps) {
  const toolName = part.toolInvocation.toolName;

  if (toolName === "computer" || (!toolName && part.toolInvocation.args?.action)) {
    return <ComputerInvocation part={part} isLatestMessage={props.isLatestMessage} status={props.status} />;
  }

  if (toolName === "bash" || (!toolName && part.toolInvocation.args?.command)) {
    return <BashInvocation part={part} isLatestMessage={props.isLatestMessage} status={props.status} />;
  }

  return <GenericInvocation part={part} isLatestMessage={props.isLatestMessage} status={props.status} />;
}

export function PreviewMessage(props: PreviewMessageProps) {
  const { message } = props;

  const noColumnsStyle = {
    columnCount: 1,
    columns: 'auto',
    columnWidth: 'auto',
    MozColumnCount: 1,
    WebkitColumnCount: 1,
    display: 'block',
  };

  if (message.parts && message.parts.length > 0) {
    return (
      <>
        {message.parts.map((part, index) => {
          if (part.type === "tool-invocation") {
            return <div key={`${message.id}-${index}`} className="group/message w-full mb-1" data-role={message.role} style={noColumnsStyle}>{renderToolInvocation(part, props)}</div>;
          } else if (part.type === "text") {
            return (
              <div key={`${message.id}-${index}`} className="group/message w-full mb-1" data-role={message.role} style={noColumnsStyle}>
                {message.role === "user" ? (
                  <div className="flex justify-end items-start">
                    <span className="user-message-bubble">
                      {part.text}
                    </span>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="w-full break-words max-w-full" style={noColumnsStyle}>
                      <Markdown>{part.text}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </>
    );
  }

  return (
    <div className="group/message w-full" data-role={message.role} style={noColumnsStyle}>
      {message.role === "user" ? (
        <div className="flex justify-end items-start">
          <span className="user-message-bubble">
            {message.content}
          </span>
        </div>
      ) : (
        <div className="flex">
          <div className="w-full break-words max-w-full" style={noColumnsStyle}>
            <Markdown>{message.content}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
