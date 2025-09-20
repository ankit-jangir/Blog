import React from 'react'

export default function Offline({ title = 'You are offline', subtitle = 'Please check your internet connection.' }) {
  return (
    <div className="flex h-80 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-40 w-64 items-center justify-center">
          <svg viewBox="0 0 200 140" width="256" height="180">
            <defs>
              <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
              <linearGradient id="gradAmber" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>

            {/* Floating cloud */}
            <g className="cloud-float">
              <circle cx="70" cy="58" r="18" fill="url(#gradBlue)" opacity="0.95" />
              <circle cx="88" cy="52" r="22" fill="url(#gradBlue)" opacity="0.95" />
              <circle cx="110" cy="60" r="20" fill="url(#gradBlue)" opacity="0.95" />
              <rect x="62" y="60" width="60" height="20" rx="10" fill="url(#gradBlue)" opacity="0.95" />
            </g>

            {/* Wifi arcs fading */}
            <g transform="translate(100,80)">
              <path d="M -24 8 A 28 28 0 0 1 24 8" fill="none" stroke="#0EA5E9" strokeWidth="3" opacity="0.15" className="wifi-arc arc1" />
              <path d="M -18 14 A 22 22 0 0 1 18 14" fill="none" stroke="#0EA5E9" strokeWidth="3" opacity="0.25" className="wifi-arc arc2" />
              <path d="M -12 20 A 16 16 0 0 1 12 20" fill="none" stroke="#0EA5E9" strokeWidth="3" opacity="0.45" className="wifi-arc arc3" />
              <circle cx="0" cy="26" r="4" fill="#0EA5E9" opacity="0.7" className="wifi-dot" />
              {/* cross (no signal) */}
              <g className="no-signal">
                <line x1="-26" y1="6" x2="-36" y2="-6" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
                <line x1="-36" y1="6" x2="-26" y2="-6" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>

            {/* Paper plane trying to connect */}
            <g className="plane" transform="translate(20,100)">
              <polygon points="0,0 18,-6 4,6 8,2" fill="url(#gradAmber)" />
              <path d="M -10 4 Q 0 2 10 0" stroke="#F59E0B" strokeWidth="2" fill="none" className="trail" />
            </g>

            {/* Ground shadow */}
            <ellipse cx="100" cy="120" rx="36" ry="8" fill="#E5E7EB" opacity="0.7" className="shadow-fade" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>

        <style>{`
          .cloud-float { animation: cloud 4s ease-in-out infinite; }
          .wifi-arc { animation: fadeArc 2.2s ease-in-out infinite; }
          .wifi-arc.arc1 { animation-delay: 0s; }
          .wifi-arc.arc2 { animation-delay: .25s; }
          .wifi-arc.arc3 { animation-delay: .5s; }
          .wifi-dot { animation: pulseDot 1.8s ease-in-out infinite; }
          .no-signal { animation: blink 1.8s ease-in-out infinite; }
          .plane { animation: planeLoop 3.6s ease-in-out infinite; }
          .trail { stroke-dasharray: 20 40; animation: trailMove 1.8s linear infinite; }
          .shadow-fade { animation: shadow 3.6s ease-in-out infinite; }

          @keyframes cloud {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes fadeArc {
            0% { opacity: .15; }
            50% { opacity: .6; }
            100% { opacity: .15; }
          }
          @keyframes pulseDot {
            0%, 100% { transform: scale(1); opacity: .6; }
            50% { transform: scale(1.25); opacity: 1; }
          }
          @keyframes blink {
            0%, 100% { opacity: .2; }
            50% { opacity: 1; }
          }
          @keyframes planeLoop {
            0% { transform: translate(20px, 100px) rotate(-8deg); }
            50% { transform: translate(70px, 90px) rotate(4deg); }
            100% { transform: translate(20px, 100px) rotate(-8deg); }
          }
          @keyframes trailMove {
            to { stroke-dashoffset: -60; }
          }
          @keyframes shadow {
            0%, 100% { transform: scale(1); opacity: .7; }
            50% { transform: scale(.92); opacity: .5; }
          }
        `}</style>
      </div>
    </div>
  )
}


