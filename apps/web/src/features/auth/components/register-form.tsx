import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import type { AuthUser } from "@delysa/shared";
import { Link } from "@tanstack/react-router";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { PasswordStrengthMeter } from "~/features/auth/components/password-strength-meter";
import {
  authErrorMessage,
  firstFieldErrors,
} from "~/features/auth/lib/auth-errors";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "~/features/auth/schemas/register-form-schema";
import { useRegister } from "~/features/auth/hooks/use-register";

type RegisterFormProps = {
  onSuccess?: (user: AuthUser) => void;
};

const inputClassName =
  "h-10 rounded-lg border-[#D6CBC6] bg-[#FFFFFF] px-3.5 text-sm placeholder:text-[#78716C] focus-visible:border-[#BE185D] focus-visible:ring-[#BE185D]/20 aria-invalid:border-[#DC2626] aria-invalid:ring-1 aria-invalid:ring-[#DC2626]/15";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-[#BE185D]">
      *
    </span>
  );
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { registerAsync, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const passwordValue =
    useWatch({ control: form.control, name: "password" }) ?? "";

  const onSubmit = async (values: RegisterFormValues) => {
    form.clearErrors("root");
    try {
      const user = await registerAsync(values);
      onSuccess?.(user);
    } catch (error) {
      const fieldErrors = firstFieldErrors(error);
      for (const field of ["name", "email", "password"] as const) {
        const message = fieldErrors?.[field];
        if (message) form.setError(field, { message });
      }
      form.setError("root", { message: authErrorMessage(error, "register") });
    }
  };

  const isSubmitting = form.formState.isSubmitting || isPending;
  const rootError = form.formState.errors.root?.message;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col gap-1"
    >
      <FieldGroup className="gap-0.5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-0.5">
              <FieldLabel
                htmlFor="register-name"
                className="text-[13px] font-medium text-[#1A1A1A]"
              >
                Nama Lengkap <RequiredMark />
              </FieldLabel>
              <Input
                {...field}
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="contoh: Sinta Ayu"
                aria-invalid={fieldState.invalid}
                className={inputClassName}
              />
              <div className="min-h-[14px]">
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[11px] leading-tight"
                  />
                )}
              </div>
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-0.5">
              <FieldLabel
                htmlFor="register-email"
                className="text-[13px] font-medium text-[#1A1A1A]"
              >
                Email <RequiredMark />
              </FieldLabel>
              <Input
                {...field}
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="contoh: nama@domain.com"
                aria-invalid={fieldState.invalid}
                className={inputClassName}
              />
              <div className="min-h-[14px]">
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[11px] leading-tight"
                  />
                )}
              </div>
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-0.5">
              <FieldLabel
                htmlFor="register-password"
                className="text-[13px] font-medium text-[#1A1A1A]"
              >
                Kata Sandi <RequiredMark />
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Buat kata sandi aman"
                  aria-invalid={fieldState.invalid}
                  aria-describedby="register-password-help register-password-strength"
                  className={`${inputClassName} pr-10 pl-3.5`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-lg p-1.5 text-[#6B7280] hover:bg-[#F8F9FA] hover:text-[#111111] focus-visible:outline-2 focus-visible:outline-[#111111]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="mt-1">
                <PasswordStrengthMeter password={passwordValue} />
              </div>
              <div className="min-h-[14px]">
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-[11px] leading-tight"
                  />
                )}
              </div>
            </Field>
          )}
        />
      </FieldGroup>

      {rootError ? (
        <Alert
          variant="destructive"
          className="rounded-xl border-[#FECACA] bg-[#FEF2F2] px-3 py-2"
        >
          <AlertDescription className="text-[12px] leading-snug text-[#B91C1C]">
            {rootError}
          </AlertDescription>
        </Alert>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 w-full rounded-lg bg-[#BE185D] text-sm font-semibold text-white hover:bg-[#9D174D] active:translate-y-px"
      >
        {isSubmitting ? "Mendaftarkan..." : "Buat Akun Sekarang"}
        {!isSubmitting ? <ArrowRight size={16} aria-hidden="true" /> : null}
      </Button>

      <p className="mt-1 text-center text-[11px] leading-relaxed text-[#57534E]">
        Dengan mendaftar, Anda menyetujui{" "}
        <Link
          to="/about"
          className="font-medium text-[#1C1917] underline underline-offset-2 hover:text-[#BE185D]"
        >
          Syarat &amp; Ketentuan
        </Link>{" "}
        serta{" "}
        <Link
          to="/about"
          className="font-medium text-[#1C1917] underline underline-offset-2 hover:text-[#BE185D]"
        >
          Kebijakan Privasi
        </Link>{" "}
        Delysa Florist.
      </p>
    </form>
  );
}
