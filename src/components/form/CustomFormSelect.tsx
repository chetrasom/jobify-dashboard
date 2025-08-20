import { Control } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
type CustomFormSelectProps = {
    name: string;
    control: Control<any>;
    items: string[];
    labelText?: string;
};
const CustomFormSelect = ({  name, control, items, labelText }: CustomFormSelectProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='w-full'>
                    <FormLabel className='capitalize'>{labelText || name}</FormLabel>

                    <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                        // defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="py-5 w-full">
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {items.map((item) => {
                                return (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default CustomFormSelect