import { MotionConfig } from 'motion/react';
import { getInvite } from './invites';
import { useRoute } from './shared';
import { Home } from './Home';
import { Invitation } from './Invitation';

export default function App() {
  const route = useRoute();
  const invite = route ? getInvite(route) : undefined;
  return (
    <MotionConfig reducedMotion="user">
      {invite ? <Invitation key={invite.slug} invite={invite} /> : <Home />}
    </MotionConfig>
  );
}
