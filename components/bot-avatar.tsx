import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
	return (
		<Avatar className="h-[43px] w-[32px]">
			<AvatarImage className="p-1" src="/avatarprokit.png" />
		</Avatar>
	);
};
