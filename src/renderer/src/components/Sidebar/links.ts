import { IconKey } from "@tabler/icons-react";
import { AiOutlineHome } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { PiPackageDuotone } from "react-icons/pi";

export const data = [
  { link: '/', label: 'Home', icon: AiOutlineHome },
  { link: '/product', label: 'Products', icon: PiPackageDuotone },
  { link: '/purchase', label: 'Purchase', icon: BiPurchaseTag },
  { link: '/users', label: 'User', icon: FaUsers },
  { link: '/sales', label: 'Sales', icon: IconKey }
]
