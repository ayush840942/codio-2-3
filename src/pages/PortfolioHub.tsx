import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DrawnCard, DrawnButton } from '@/components/ui/HandDrawnComponents';
import { Lock, Star, FolderOpen, ArrowRight } from 'lucide-react';
import { portfolioProjects } from '@/data/portfolioProjects';
import MobileHeader from '@/components/MobileHeader';
import PremiumGateModal from '@/components/premium/PremiumGateModal';

const PortfolioHub = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(portfolioProjects[0]);
  const [showPremiumGate, setShowPremiumGate] = useState(false);

  const handleStartProject = (project: typeof portfolioProjects[0]) => {
    if (project.isPremium && !project.isUnlocked) {
      setShowPremiumGate(true);
      return;
    }
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="min-h-[100dvh] bg-pastel-yellow/5 font-draw pb-32">
      {/*...rest remains clean... */}
      {/* Unified Mobile Header */}
      <MobileHeader
        title="Portfolio"
        subtitle="Build real-world apps"
        showBack
        rightElement={
          <div className="w-10 h-10 bg-cc-yellow border-2 border-black rounded-xl flex items-center justify-center shadow-comic-sm -rotate-6">
            <FolderOpen className="w-5 h-5 text-black" strokeWidth={3} />
          </div>
        }
      />

      <div className="px-6 py-8" style={{ paddingTop: 'calc(var(--safe-area-top) + 3rem)' }}>

        <div className="px-6 space-y-6">
          {portfolioProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <DrawnCard
                className={`p-5 cursor-pointer border-4 group transition-transform ${selectedProject.id === project.id ? 'bg-cc-green shadow-comic-lg scale-[1.02] -rotate-1' : 'bg-white shadow-comic hover:scale-[1.01]'}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex gap-4">
                  <div className="text-4xl">{project.icon}</div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-black text-xl uppercase leading-none tracking-tight">
                        {project.title}
                      </h3>
                      {project.isPremium && (
                        <div className="bg-cc-yellow border-2 border-black rounded-full p-1.5 shadow-comic-sm">
                          <Lock className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </div>

                    <p className="text-sm font-bold text-black/70 leading-snug mb-3">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase px-2 py-1 bg-black/5 rounded-md border border-black/10">
                        {project.difficulty}
                      </span>
                      <span className="text-[10px] font-black uppercase text-black/50">
                        {project.estimatedTimeMin} mins
                      </span>
                      <span className="text-[10px] font-black uppercase text-black/50">
                        {project.steps.length} Steps
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedProject.id === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 mt-5 border-t-3 border-black border-dashed flex justify-between items-center">
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border-2 border-black shadow-comic-sm font-black text-xs">
                          <Star className="w-3 h-3 fill-cc-yellow text-cc-yellow" />
                          +500 XP
                        </div>

                        <DrawnButton
                          variant="outlined"
                          className="h-10 px-6 "
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleStartProject(project);
                          }}
                        >
                          BUILD IT <ArrowRight className="w-4 h-4 ml-1" />
                        </DrawnButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </DrawnCard>
            </motion.div>
          ))}
        </div>

        <PremiumGateModal
          isOpen={showPremiumGate}
          onClose={() => setShowPremiumGate(false)}
          trigger="feature"
        />
      </div>
    </div>
  );
};

export default PortfolioHub;
