import React from 'react'

export default function EmptyState({ title = 'No data found', subtitle = 'There is nothing to display yet.', action, variant = 'man' }) {
  return (
    <div className="flex h-72 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center">
          {/* Simple animated person illustration */}
          <svg viewBox="0 0 120 120" width="120" height="120">
            {/* ground shadow */}
            <ellipse cx="60" cy="105" rx="28" ry="6" fill="#E2E8F0" opacity="0.7" className="empty-float" />
            {/* body */}
            <circle cx="60" cy="36" r="12" fill={variant === 'woman' ? '#F59E0B' : '#38BDF8'} />
            <rect x="48" y="48" width="24" height="32" rx="6" fill="#94A3B8" />
            {/* legs */}
            <rect x="50" y="80" width="6" height="18" rx="3" fill="#64748B" />
            <rect x="64" y="80" width="6" height="18" rx="3" fill="#64748B" />
            {/* left arm */}
            <rect x="38" y="52" width="10" height="18" rx="4" fill="#9CA3AF" className="empty-float" />
            {/* right arm waving */}
            <g transform="translate(72,52)">
              <rect x="0" y="0" width="10" height="18" rx="4" fill="#9CA3AF" className="arm-wave" />
            </g>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        {action && <div className="mt-4">{action}</div>}
        <style>{`
          .arm-wave {
            transform-origin: 0px 4px;
            animation: wave 1.6s ease-in-out infinite;
          }
          .empty-float {
            animation: floatY 3s ease-in-out infinite;
          }
          @keyframes wave {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(20deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0); opacity: 0.9; }
            50% { transform: translateY(-3px); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  )
}


