'use client';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function CelebrationModal({ isOpen, onClose, message }: CelebrationModalProps) {
  if (!isOpen) return null;

  // Split message by exclamation marks to handle multi-part messages
  const messageParts = message.split('!').filter(part => part.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-in zoom-in duration-300 border-4 border-purple-200">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            {messageParts.map((part, index) => (
              <div key={index}>
                {part.trim()}!
              </div>
            ))}
          </h2>
          <button
            onClick={onClose}
            className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
