import { ButtonHTMLAttributes } from "react";
import { useTheme } from "../context/ThemeContext";
import { ButtonMain } from "./ButtonMain";
import { BiMoon, BiSun } from "react-icons/bi";
import { useStart } from "../context/StartContext";

interface ThemeSwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: VariantProps;
  size: SizeProps;
}

type VariantProps = "default" | "outline" | "ghost" | "subtle";
type SizeProps = "default" | "sm" | "lg" | "icon";

export default function ThemeSwitch({
  className,
  variant,
  size,
}: ThemeSwitchProps) {
  const { theme, toggleTheme } = useTheme();
  const { start } = useStart();
  return (
    <ButtonMain
      variant={variant}
      size={size}
      onClick={toggleTheme}
      disabled={start}
      className={className}
    >
      {theme === "light" ? <BiMoon /> : <BiSun />}
    </ButtonMain>
  );
}
