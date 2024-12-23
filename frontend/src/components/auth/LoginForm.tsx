import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppDispatch, RootState } from "@/app/store";
import { login } from "../features/auth/loginSlice";

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { status, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            try {
                await dispatch(login(formData)).unwrap();
                navigate("/");
            } catch (err) {
                console.error("Login failed:", err);
                setErrors((prev) => ({ ...prev, form: "Invalid credentials or server error" }));
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mx-auto max-w-md space-y-8 p-6 bg-white text-black">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-600">Enter your credentials to access your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-describedby="email-error"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500" id="email-error">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            aria-describedby="password-error"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-red-500" id="password-error">
                            {errors.password}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full text-white" disabled={status === "loading"}>
                    {status === "loading" ? "Logging in..." : "Log In"}
                </Button>
                {errors.form && (
                    <p className="text-sm text-red-500 text-center mt-2">{errors.form}</p>
                )}
                {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
            </form>
            <div className="text-center text-sm">
                <a href="#" className="text-black hover:underline">
                    Forgot password?
                </a>
            </div>
        </div>
    );
};

export default LoginForm;
