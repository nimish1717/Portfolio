import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Cpu, FileText, Database, Activity, CheckCircle, Smartphone, BarChart3, Settings } from 'lucide-react';

const ParkEasePreview = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white space-y-6">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center space-x-2 text-[#46B7FF] mb-2"
    >
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <MapPin size={24} />
      </motion.div>
      <span className="font-mono text-sm uppercase tracking-widest">Live Map</span>
    </motion.div>
    
    <div className="flex space-x-4 w-full max-w-sm justify-between">
      {[
        { label: 'AVAILABLE', val: '12', color: 'text-green-400' },
        { label: 'OCCUPIED', val: '6', color: 'text-red-400' },
        { label: 'RESERVED', val: '3', color: 'text-yellow-400' }
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          className="flex flex-col items-center bg-[#0D0D11] border border-[#46B7FF]/20 p-3 rounded w-[30%]"
        >
          <span className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.val}</span>
          <span className="text-[9px] font-mono text-gray-400">{stat.label}</span>
        </motion.div>
      ))}
    </div>

    <div className="w-full max-w-sm h-24 mt-4 relative bg-[#0D0D11] border border-[#46B7FF]/20 rounded p-4 flex flex-col justify-end">
      <span className="absolute top-3 left-4 text-[10px] font-mono text-gray-400 uppercase">Dynamic Pricing</span>
      <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
        <motion.path
          d="M0,25 Q15,10 30,20 T60,15 T100,5"
          fill="none"
          stroke="#46B7FF"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.circle cx="100" cy="5" r="2" fill="#46B7FF" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} />
      </svg>
    </div>
  </div>
);

const VeltoPreview = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white space-y-6">
    <div className="w-full max-w-sm flex justify-between space-x-4 mb-4">
      {[
        { label: 'INCOME', val: '+$4,250', icon: TrendingUp },
        { label: 'EXPENSES', val: '-$1,840', icon: BarChart3 },
        { label: 'BALANCE', val: '$2,410', icon: Database }
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="flex-1 bg-[#060608] border border-[#46B7FF]/30 p-3 rounded-lg flex flex-col items-start"
        >
          <item.icon size={12} className="text-[#46B7FF] mb-2" />
          <span className="text-sm font-bold text-[#EDEAE4]">{item.val}</span>
          <span className="text-[8px] font-mono text-gray-400">{item.label}</span>
        </motion.div>
      ))}
    </div>

    <div className="w-full max-w-sm h-32 bg-[#060608] border border-[#46B7FF]/20 rounded-lg p-4 flex items-end justify-between space-x-2">
      {[40, 70, 45, 90, 60, 85, 30].map((h, i) => (
        <div key={i} className="w-full bg-[#1A1A24] rounded-t-sm relative h-full flex items-end">
          <motion.div
            className="w-full bg-[#46B7FF] rounded-t-sm"
            initial={{ height: '0%' }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
          />
        </div>
      ))}
    </div>
  </div>
);

const FlowNode = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center z-10 bg-[#060608]"
  >
    <div className="w-10 h-10 rounded-full border border-[#46B7FF]/50 bg-[#0D0D11] flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(70,183,255,0.15)]">
      <Icon size={16} className="text-[#46B7FF]" />
    </div>
    <span className="text-[9px] font-mono text-[#EDEAE4] tracking-widest">{label}</span>
  </motion.div>
);

const FixMatePreview = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white relative">
    <div className="flex flex-col space-y-6 items-center relative">
      <motion.div
        className="absolute top-0 bottom-8 w-px bg-gradient-to-b from-[#46B7FF] to-transparent z-0"
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: 'easeInOut' }}
      />
      <FlowNode icon={Smartphone} label="REQUEST" delay={0.2} />
      <FlowNode icon={Cpu} label="CLASSIFY" delay={0.7} />
      <FlowNode icon={Settings} label="VERIFY" delay={1.2} />
      <FlowNode icon={CheckCircle} label="COMPLETED" delay={1.7} />
    </div>
  </div>
);

const MultiFusionPreview = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white relative">
    <div className="flex justify-center space-x-4 mb-10 w-full relative">
      {[
        { label: 'ECG', icon: Activity },
        { label: 'TEXT', icon: FileText },
        { label: 'FACE', icon: Smartphone },
        { label: 'VOICE', icon: Activity }
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="flex flex-col items-center relative z-10 bg-[#060608]"
        >
          <div className="w-10 h-10 rounded border border-[#46B7FF]/30 bg-[#0D0D11] flex items-center justify-center mb-2">
            <item.icon size={16} className="text-[#46B7FF]" />
          </div>
          <span className="text-[9px] font-mono text-gray-400">{item.label}</span>
          <motion.div
            className="absolute -bottom-8 left-1/2 w-px h-8 bg-[#46B7FF]/50 origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
          />
        </motion.div>
      ))}
      <motion.div
        className="absolute -bottom-10 left-[12%] right-[12%] h-px bg-[#46B7FF]/50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
      <motion.div
        className="absolute -bottom-16 left-1/2 w-px h-6 bg-[#46B7FF]/50 origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
      />
    </div>

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5 }}
      className="mt-6 flex flex-col items-center bg-[#0D0D11] border border-[#46B7FF]/80 p-4 rounded-lg shadow-[0_0_25px_rgba(70,183,255,0.2)] z-10"
    >
      <span className="text-[10px] font-mono text-[#46B7FF] mb-1">FUSION MODEL</span>
      <span className="text-sm font-bold tracking-widest uppercase">PREDICTION</span>
    </motion.div>
  </div>
);

const EBookCreatorPreview = () => (
  <div className="w-full h-full flex flex-row items-center justify-center p-6 text-white space-x-4 relative">
    <motion.div
      className="absolute top-1/2 left-[20%] right-[20%] h-px bg-[#46B7FF]/30 origin-left z-0"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    {[
      { label: 'WRITE' },
      { label: 'DESIGN' },
      { label: 'PREVIEW' },
      { label: 'EXPORT' }
    ].map((step, i) => (
      <motion.div
        key={step.label}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 + i * 0.4 }}
        className="flex flex-col items-center bg-[#060608] z-10"
      >
        <div className="w-12 h-16 bg-[#0D0D11] border border-[#46B7FF]/40 rounded-sm mb-3 flex flex-col p-1 space-y-1 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <motion.div className="w-full h-1 bg-[#46B7FF]/20 rounded-full" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.4 + i * 0.4 }} />
          <motion.div className="w-3/4 h-1 bg-[#46B7FF]/20 rounded-full" initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ delay: 0.5 + i * 0.4 }} />
          <motion.div className="w-full h-1 bg-[#46B7FF]/20 rounded-full" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.6 + i * 0.4 }} />
        </div>
        <span className="text-[9px] font-mono text-gray-400 tracking-widest">{step.label}</span>
      </motion.div>
    ))}
  </div>
);

export const LivePreview = ({ projectId }) => {
  switch (projectId) {
    case 'parkease':
      return <ParkEasePreview />;
    case 'velto':
      return <VeltoPreview />;
    case 'fixmate':
      return <FixMatePreview />;
    case 'multifusion':
      return <MultiFusionPreview />;
    case 'ebookcreator':
      return <EBookCreatorPreview />;
    default:
      return <div className="w-full h-full flex items-center justify-center text-[#46B7FF] font-mono text-xs">PREVIEW UNAVAILABLE</div>;
  }
};
