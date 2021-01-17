import { useContext } from 'react';
import { StudioContext } from '~/store';

const useStudio = () => {
  const StudioStore = useContext(StudioContext);
  return StudioStore;
};

export default useStudio;
