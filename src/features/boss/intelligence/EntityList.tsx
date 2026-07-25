'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Building, User, FileText, Calendar, Hash, MapPin } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { EntityItem } from '../../../types/boss.types';
import { cn } from '../../../utils/cn';

interface EntityListProps {
  entities?: EntityItem[];
  className?: string;
}

const catIcons: Record<string, React.ElementType> = {
  person: User,
  company: Building,
  department: Tag,
  file: FileText,
  date: Calendar,
  number: Hash,
  location: MapPin,
};

export function EntityList({ entities = [], className }: EntityListProps) {
  if (entities.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg space-y-3', className)}
    >
      <SectionHeader
        icon={Tag}
        title="Extracted Named Entities"
        description="Parsing semantic tokens for companies, dates, departments, and files"
        badge={`${entities.length} Entities`}
      />

      <div className="flex flex-wrap gap-2">
        {entities.map((ent) => {
          const Icon = catIcons[ent.category] || Tag;
          return (
            <div
              key={ent.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/50 bg-card/60 text-xs font-semibold hover:border-primary/40 transition-colors shadow-xs"
            >
              <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-foreground">{ent.name}</span>
              <span className="text-[9px] font-mono text-muted-foreground/60">({ent.confidence}%)</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default EntityList;
