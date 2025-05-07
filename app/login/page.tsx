"use client";
import * as React from "react";
import styles from './styles.module.css';
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import {useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Text, TextField} from "@radix-ui/themes";
import { LoginFormValues } from "./type";
import { loginSchema } from "./schema";

export default function LoginForm() {
  const { handleSubmit, formState: { errors }, control } = 
  useForm<LoginFormValues>({resolver: yupResolver(loginSchema), mode: "onBlur"});
  const [inputValue, setInputValue] = React.useState("");
  const [errorLength, setErrorLength] = React.useState(false);
  function handleLogin(data: LoginFormValues) {
    console.log(data)
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>, fieldOnChange: (value: string) => void) {
    const newValue = e.target.value;
    if (newValue.length <= 20) {
      setInputValue(newValue);
      setErrorLength(false);
      fieldOnChange(newValue);
    } else {
      setErrorLength(true);
    }
  
  
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Login</h2>
        <form>
          <div className={styles.formGroup}>
            <Label htmlFor="email" className={styles.label}>
              Email
            </Label>
            <Controller
              name = "email"
              control={control}
              render = {({field: {onChange, onBlur, value}})=>(
                <>
                  <TextField.Root id="email" type="email" onBlur={onBlur} onChange={onChange}
                  value={value} className={`${styles.input} ${errors?.email? styles.errorBorder: ""}`}  />
                  {errors?.email && <small className={styles.error}>{errors.email.message}</small>}
                </>
              )}
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="password" className="label">
              Password
            </Label>
            <Controller
              name = "password"
              control={control}
              render = {({field: {onChange, onBlur, value}})=>(
                <>
                  <TextField.Root id="password" type="password" onBlur={onBlur} onChange={e => handleOnChange(e, onChange)} 
                  value={value} className={`${styles.input} ${errors?.password? styles.errorBorder: ""}`} />
                  {errors?.password && <small className={styles.error}>{errors.password.message}</small>}
                  {errorLength && <small className={styles.error}>Password must be at most 20 characters</small>}
                </>
              )}
            />
          </div>

          <Button className={styles.button} onClick={handleSubmit(handleLogin)}>
            Login
          </Button>
        </form>
        <Text className={styles.footerText}>
          Don't have an account?
          <Link href="/signup" className={styles.link}>Sign up</Link>
        </Text>
      </div>
    </div>
  );
}