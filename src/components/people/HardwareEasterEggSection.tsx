import React from 'react';
import { hardwareMembers } from '../../data/equipment';
import { SectionHeader } from '../common/SectionHeader';
import { HardwareCard } from './HardwareCard';

export const HardwareEasterEggSection: React.FC = () => {
  return (
    <section className="members-section" aria-label="Hardware Members">
      <div className="container">
        <SectionHeader title="Hardware Members" />

        <div className="members-grid">
          {hardwareMembers.map((item) => (
            <HardwareCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
