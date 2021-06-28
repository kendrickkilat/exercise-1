import { useToast } from 'primevue/usetoast';

export default function useToastSpace() {
  const toast = useToast();

  function instantiateToast(data): void {
    toast.add(data);
  }

  return {
    instantiateToast,
  };
}
