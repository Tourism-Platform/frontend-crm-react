import { useId } from "react";

import {
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./shadcn-ui";

const InputEndSelectDemo = () => {
	const id = useId();

	return (
		<div className="w-full max-w-xs space-y-2">
			<Label htmlFor={id}>Input with end select</Label>
			<div className="w-full">
				<Input id={id} type="text" placeholder="shadcnstudio" />
				<Select defaultValue=".com">
					<SelectTrigger id={id}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							value=".com"
							className="pr-2 [&_svg]:hidden"
						>
							.com
						</SelectItem>
						<SelectItem
							value=".org"
							className="pr-2 [&_svg]:hidden"
						>
							.org
						</SelectItem>
						<SelectItem
							value=".net"
							className="pr-2 [&_svg]:hidden"
						>
							.net
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default InputEndSelectDemo;
