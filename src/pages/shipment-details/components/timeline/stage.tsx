import { HTMLAttributes } from 'react';
import './styles.scss';

type StageProps = HTMLAttributes<HTMLElement> & {
  stageData: {
    order: number;
    message: string;
    currentStage: number;
    msg?: string;
  };
};
export default function Stage({
  className,
  stageData: { order, message, currentStage, msg },
  ...props
}: StageProps) {
  const coloredBubble = order <= currentStage;
  const showIcon = order >= currentStage;
  return (
    <div {...props} className={`stage ${className ?? ''}`}>
      <div
        className={`icon ${coloredBubble && 'highlighted'} ${
          !showIcon && 'done'
        }`}
      >
        <img
          src={showIcon ? `/${order}.svg` : '/check-solid.svg'}
          alt="Stage Icon"
        />
      </div>
      <p>{message}</p>
      {msg && currentStage === order && (
        <span>
          <em>{msg}</em>
        </span>
      )}
    </div>
  );
}
