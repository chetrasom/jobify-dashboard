import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from "../ui/input";
type CustomFormFieldProps = {
    name: string;
    control: Control<any>;
    placeholder?: string
};
const CustomFormField = ({ name, control, placeholder }: CustomFormFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="capitalize">{name}</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            className="h-11"
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField