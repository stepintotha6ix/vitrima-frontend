import { useAuth } from "@/hooks/useAuth";
import { UserService } from "@/services/user/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { ISettingsProfileInput } from "./settings.interface";
import { toast } from "react-toastify";
import { IContractor } from "@/components/shared/types/user.types";

export const useProfile = (
  setValue: any
) => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = String(searchParams.get("id"));
  const { push } = router;

  const { isLoading } = useQuery("profile", () => UserService.getProfile(), {
    onSuccess: ({ data }) => {
      const fieldsToSet = ["email", "nickname","description", "image", "location"];

      // Пройдемся по массиву и установим значения для каждого поля
      fieldsToSet.forEach((field) => {
        if (data[field as keyof IContractor]) {
          setValue(field, data[field as keyof IContractor]);
        }
      });
    },
    onError: (error) => {
      console.log(error, "Get profile");
    },
  });

  const { mutateAsync } = useMutation(
    "update profile",
    (data: ISettingsProfileInput) => UserService.updateProfile(data),
    
    {
      onError: () => {
      
        toast.error("Произошла ошибка, повторите снова")
      },
      onSuccess(){
      toast.success('Данные профиля обновлены')
    }
    }
  );

  const onSubmit: SubmitHandler<ISettingsProfileInput> = async (data) => {
    await mutateAsync(data);
  };

  return { isLoading,onSubmit };
};