import type { ReactNode } from 'react';
import { TopBar } from '../../components/TopBar/TopBar';
import { ContextHeader } from '../../components/ContextHeader/ContextHeader';
import { ProofFooter } from '../../components/ProofFooter/ProofFooter';
import type { TopBarProps, ContextHeaderProps, ProofFooterProps } from '../../types';
import './AppLayout.css';

type AppLayoutProps = {
  topBar: TopBarProps;
  contextHeader: ContextHeaderProps;
  proofFooter: ProofFooterProps;
  children: ReactNode;
  secondaryPanel?: ReactNode;
};

export function AppLayout({
  topBar,
  contextHeader,
  proofFooter,
  children,
  secondaryPanel
}: AppLayoutProps) {
  return (
    <div className="app-layout">
      <TopBar {...topBar} />
      <ContextHeader {...contextHeader} />
      
      <main className="app-layout__main">
        <div className="app-layout__content">
          <div className="app-layout__primary">
            {children}
          </div>
          {secondaryPanel && (
            <aside className="app-layout__secondary">
              {secondaryPanel}
            </aside>
          )}
        </div>
      </main>
      
      <ProofFooter {...proofFooter} />
    </div>
  );
}
