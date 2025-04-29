import * as React from "react";
import "./styles.css";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";

import { Button, Text, TextField} from "@radix-ui/themes";

export default function LoginForm() {
  return (
    <div className="container">
      <div className="card">
        <h2 className="heading">Login</h2>
        <form>
          <div className="form-group">
            <Label htmlFor="email" className="label">
              Email
            </Label>
              <TextField.Root id="email" type="email" />
          </div>

          <div className="form-group">
            <Label htmlFor="password" className="label">
              Password
            </Label>
            <TextField.Root id="password" type="password" className="input" />
          </div>

          <Button type="submit" className="button">
            Login
          </Button>
        </form>
        <Text className="footer-text">
          Don't have an account?
          <Link href="/signup" className="link">Sign up</Link>
        </Text>
      </div>
    </div>
  );
}