"use client"
import * as React from "react";
import * as Label from "@radix-ui/react-label";
import { Button, TextField } from "@radix-ui/themes";
import styles from './styles.module.css';
import { Controller, useForm } from "react-hook-form";
import { SignupFormValues } from "./type";
import { signUpschema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Signup() {
  const [valid, setValid] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [errorLength, setErrorLength] = React.useState(false);
  const { control,
          handleSubmit, 
          trigger,
          formState: { errors } } = 
          useForm<SignupFormValues>({resolver: yupResolver(signUpschema), mode: "onBlur"});
function handleSignUp(data: SignupFormValues) {
console.log(data);
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
        <h2 className={styles.heading}>Sign up</h2>
        <form>
          <div className={styles.formGroup}>
            <Label.Root htmlFor="email" className={styles.label}>
              Email
            </Label.Root>
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
            <Label.Root htmlFor="password" className={styles.label}>
              Password
            </Label.Root>
            <Controller
              name = "password"
              control={control}
              render = {({field: {onChange, onBlur, value}})=>(
                <>
                  <TextField.Root id="password" type="password" onBlur={onBlur} onChange={e => handleOnChange(e, onChange)}
                  value={value} className={`${styles.input} ${errors?.password? styles.errorBorder: ""}`}  />
                  {errors?.password && <small className={styles.error}>{errors.password.message}</small>}
                  {errorLength && <small className={styles.error}>Password must be at most 20 characters</small>}
                </>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Label.Root htmlFor="password" className={styles.label}>
              Confirm password
            </Label.Root>
            <Controller
              name = "confirmpassword"
              control={control}
              render = {({field})=>(
                <>
                  <TextField.Root {...field} id="confirmpassword" type="password" onBlur = {async () => {
                    const result = await trigger("confirmpassword");
                    console.log(result)
                    setValid(result);
                    field.onBlur() 
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  value={field.value} className={`${styles.input} ${valid? styles.validBorder: ""} ${errors?.confirmpassword? styles.errorBorder: ""}`}  />
                  {errors?.confirmpassword && <small className={styles.error}>{errors.confirmpassword.message}</small>}
                </>
              )}
            />
          </div>
          <Button onClick={handleSubmit(handleSignUp)} className={styles.button}>
            Create an account
          </Button>
        </form>
      </div>
    </div>
  )
}