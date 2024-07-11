import { gql } from "@/__generated__";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Error from "@/components/Error";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import LoginLayout from "@/container/login/LoginLayout";
import getTrans from "@/utils/getTrans";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassWord() {
  const [username, setUsername] = useState("");
  const T = getTrans();

  const [mutationsendPasswordResetEmail, { loading, data, error, called }] =
    useMutation(
      gql(/* GraphQL */ `
        mutation mutationSendPasswordResetEmail($username: String = "") {
          sendPasswordResetEmail(input: { username: $username }) {
            clientMutationId
            success
          }
        }
      `),
      {
        onCompleted: (data) => {
          if (data?.sendPasswordResetEmail?.success) {
            toast.success("E-postanıza bir şifre sıfırlama bağlantısı gönderildi!");
          }
        },
        onError: (error) => {
          toast.error(error.message, {
            position: "bottom-center",
          });
        },
      }
    );

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      toast.error(T["E-posta veya Kullanıcı adı girmek zorundasınız!"], {
        position: "bottom-center",
      });
      return;
    }
    mutationsendPasswordResetEmail({
      variables: {
        username,
      },
    });
  };

  return (
    <LoginLayout
      isResetPasswordPage
      rightBtn={{
        text: T["Giriş Yap"],
        href: "/giris",
      }}
    >
      <>
        <div className="grid gap-6">
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="username">{T["E-Posta veya Kullanıcı Adı"]}</Label>
                <Input
                  id="username"
                  placeholder={T["E-Posta veya Kullanıcı Adı"]}
                  autoCapitalize="none"
                  autoCorrect="off"
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="grid">
                <ButtonPrimary loading={loading}>
                  {T["Şifreyi Sıfırla"]}
                </ButtonPrimary>

                {!!error?.message && (
                  <Error className="text-center mt-2" error={error.message} />
                )}
              </div>
            </div>
          </form>
        </div>

        <p className="text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          {T["Üye Değilmisin ?"]}{" "}
          <Link
            href="/kayit"
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline underline-offset-2"
          >
            {T["Kayıt Ol"]}
          </Link>
          <span className="mx-1">|</span>
          <Link
            href="/giris"
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline underline-offset-2"
          >
            {T["Giriş"]}
          </Link>
        </p>
      </>
    </LoginLayout>
  );
}
