import { IToast } from '@/Interfaces/toast';
import { useToast } from 'primevue/usetoast';

export default function useToastSpace() {
  const toast = useToast();

  function instantiateToast(data:IToast): void {
    toast.add(data);
  }

  return {
    instantiateToast,
  };
}
