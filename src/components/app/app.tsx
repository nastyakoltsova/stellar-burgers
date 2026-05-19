import { FC } from 'react';

import { AppRoutes } from './app-routes';

import '../../index.css';
import styles from './app.module.css';

const App: FC = () => (
  <div className={styles.app}>
    <AppRoutes />
  </div>
);

export default App;
