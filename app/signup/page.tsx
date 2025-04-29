import * as React from "react";
import * as Label from "@radix-ui/react-label";
import { Button, TextField } from "@radix-ui/themes";
import styles from './styles.module.css';

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Sign up</h2>
        <form>
          <div className={styles.formGroup}>
            <Label.Root htmlFor="email" className={styles.label}>
              Email
            </Label.Root>
            <TextField.Root id="email" type="email" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <Label.Root htmlFor="password" className={styles.label}>
              Password
            </Label.Root>
            <TextField.Root id="password" type="password" className={styles.input}/>
          </div>
          <div className={styles.formGroup}>
            <Label.Root htmlFor="password" className={styles.label}>
              Confirm password
            </Label.Root>
            <TextField.Root id="confirmpassword" type="password" className={styles.input} />
          </div>
          <Button type="submit" className={styles.button}>
            Create an account
          </Button>
        </form>
      </div>
    </div>
  )
}