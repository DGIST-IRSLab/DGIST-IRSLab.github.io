import React, { useEffect, useRef, useState } from 'react';
import { professor, postdocs, graduateStudents, undergraduateResearchers, alumni, internHistory } from '../data/people';
import { PersonCard } from '../components/people/PersonCard';
import { SectionHeader } from '../components/common/SectionHeader';
import {
  GraduateHeaderCrackOverlay,
  HardwareEasterEggSection,
} from '../components/people/HardwareEasterEggSection';

const HARDWARE_UNLOCK_CLICKS = 7;

interface PeoplePageProps {
  onNavigate: (page: string, anchorId?: string) => void;
}

export const PeoplePage: React.FC<PeoplePageProps> = ({ onNavigate }) => {
  const [gradClicks, setGradClicks] = useState(0);
  const [hardwareUnlocked, setHardwareUnlocked] = useState(false);
  const [shakeTick, setShakeTick] = useState(0);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleGraduateTitleClick = () => {
    if (hardwareUnlocked) return;

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    const next = gradClicks + 1;
    if (next >= HARDWARE_UNLOCK_CLICKS) {
      setGradClicks(0);
      setHardwareUnlocked(true);
      setShakeTick((prev) => prev + 1);
      return;
    }

    setGradClicks(next);
    if (next >= 3) {
      setShakeTick((prev) => prev + 1);
    }

    // Heal cracks gently if user stops tapping for 10 seconds
    resetTimerRef.current = window.setTimeout(() => {
      setGradClicks(0);
    }, 10000);
  };

  const handleRebuildWall = () => {
    setHardwareUnlocked(false);
    setGradClicks(0);
  };

  // Clicks 3..6 map to crack stages 1..4
  const crackStage = !hardwareUnlocked && gradClicks >= 3 ? Math.min(gradClicks - 2, 4) : 0;
  const headerShakeClass =
    shakeTick > 0 && crackStage > 0
      ? `grad-header-shake-${crackStage} ${shakeTick % 2 === 0 ? 'shake-a' : 'shake-b'}`
      : '';

  return (
    <div className="people-page-root" style={{ paddingBottom: 'var(--space-section)' }}>
      {/* Header */}
      <section
        style={{
          paddingTop: 'var(--space-2xl)',
          paddingBottom: 'var(--space-sm)',
        }}
      >
        <div className="container">
          <h1 className="h1-title">
            Members
          </h1>
        </div>
      </section>

      {/* Principal Investigator */}
      <section className="members-section" style={{ paddingTop: 'var(--space-xs)' }}>
        <div className="container">
          <SectionHeader
            title="Principal Investigator"
          />
          <div className="members-grid">
            <PersonCard person={professor} onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* Postdoctoral Fellows */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Postdoctoral Fellows"
          />

          <div className="members-grid">
            {postdocs.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Graduate Students */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Graduate Students"
            className={headerShakeClass}
            onTitleClick={handleGraduateTitleClick}
            titleStyle={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            overlay={
              <GraduateHeaderCrackOverlay
                stage={crackStage}
                burstKey={shakeTick}
              />
            }
          />

          <div className="members-grid">
            {graduateStudents.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Hidden Easter Egg: Hardware Members (unlocked after 7 clicks on Graduate Students) */}
      {hardwareUnlocked && (
        <HardwareEasterEggSection onClose={handleRebuildWall} />
      )}

      {/* Undergraduate Researchers */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Undergraduate Researchers"
          />

          <div className="members-grid">
            {undergraduateResearchers.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Alumni"
          />

          <div className="members-grid">
            {alumni.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Intern History */}
      <section className="members-section">
        <div className="container">
          <SectionHeader
            title="Research Interns"
            actionText="Join the Lab"
            onActionClick={() => onNavigate('join')}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.7,
            }}
          >
            {internHistory.map((cohort, i) => (
              <div key={i} className="intern-row">
                <strong style={{ fontWeight: 700 }}>[{cohort.period}]</strong>{' '}
                <span>{cohort.names.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .members-section {
          padding-top: var(--space-2xl);
        }

        .grad-header-shake-1 { --shake-amp: 2px; }
        .grad-header-shake-2 { --shake-amp: 4px; }
        .grad-header-shake-3 { --shake-amp: 6px; }
        .grad-header-shake-4 { --shake-amp: 9px; }

        .shake-a {
          animation: gradHeaderShakeA 0.28s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        .shake-b {
          animation: gradHeaderShakeB 0.28s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        @keyframes gradHeaderShakeA {
          0%, 100% { transform: translate3d(0, 0, 0); }
          20% { transform: translate3d(calc(var(--shake-amp) * -1), 1px, 0); }
          40% { transform: translate3d(var(--shake-amp), -1px, 0); }
          60% { transform: translate3d(calc(var(--shake-amp) * -0.7), 1px, 0); }
          80% { transform: translate3d(calc(var(--shake-amp) * 0.5), 0, 0); }
        }

        @keyframes gradHeaderShakeB {
          0%, 100% { transform: translate3d(0, 0, 0); }
          20% { transform: translate3d(var(--shake-amp), -1px, 0); }
          40% { transform: translate3d(calc(var(--shake-amp) * -1), 1px, 0); }
          60% { transform: translate3d(calc(var(--shake-amp) * 0.7), -1px, 0); }
          80% { transform: translate3d(calc(var(--shake-amp) * -0.5), 0, 0); }
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: var(--space-lg);
        }

        @media (max-width: 1024px) {
          .members-grid {
            grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
            gap: var(--space-md);
          }
        }

        @media (max-width: 640px) {
          .members-section {
            padding-top: var(--space-xl);
          }

          .members-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
          }

          .intern-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }

          .intern-period {
            min-width: auto !important;
          }
        }

        @media (max-width: 360px) {
          .members-grid {
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export const MembersPage = PeoplePage;
