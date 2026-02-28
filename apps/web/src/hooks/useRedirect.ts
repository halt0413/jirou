import { useRouter } from "next/navigation";

export const useRedirect = () => {
  const router = useRouter();

  return (path: string) => {
    router.push(path);
  };
};
