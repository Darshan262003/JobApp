import { AppLayout } from './layouts/AppLayout/AppLayout';
import { Card } from './components/Card/Card';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { EmptyState } from './components/EmptyState/EmptyState';
import { ErrorState } from './components/ErrorState/ErrorState';
import './styles/global.css';

function App() {
  return (
    <AppLayout
      topBar={{
        appName: 'Job Notification App',
        currentStep: 1,
        totalSteps: 5,
        status: 'in-progress'
      }}
      contextHeader={{
        headline: 'Design System Foundation',
        subtext: 'A calm, intentional foundation for building the Job Notification App.'
      }}
      proofFooter={{
        items: [
          { label: 'UI Built', checked: true },
          { label: 'Logic Working', checked: true },
          { label: 'Test Passed', checked: false },
          { label: 'Deployed', checked: false }
        ]
      }}
      secondaryPanel={
        <Card>
          <h3 style={{ marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Secondary Panel</h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            This panel contains step explanations, copyable prompts, and secondary actions.
          </p>
          <Button variant="secondary" size="sm">Copy Prompt</Button>
        </Card>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Card>
          <h3 style={{ marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Component Showcase</h3>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>Buttons</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>Inputs</h4>
            <Input 
              label="Email Address"
              placeholder="Enter your email"
              value=""
              onChange={() => {}}
            />
          </div>
        </Card>

        <Card>
          <h3 style={{ marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>States</h3>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>Empty State</h4>
            <EmptyState
              title="No notifications yet"
              description="Set up your first job alert to start receiving notifications."
              actionLabel="Create Alert"
              onAction={() => {}}
            />
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>Error State</h4>
            <ErrorState
              title="Connection failed"
              description="We couldn't connect to the job board service."
              solution="Check your internet connection and try again."
              onRetry={() => {}}
            />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}

export default App;
