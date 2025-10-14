import Image from "next/image";
import { Button } from "@/components/ui/button";
export function ServicesSection() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden xl:rounded-md border border-gray-200">
          {/* Minecraft Servers */}
          <div className="bg-white border-gray-200 border-b md:border-r lg:border-b-0 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-2">
                <div className="pl-4 pt-2 rounded flex-shrink-0">
                  <Image
                    src="/minecraftgrass.png"
                    alt="Minecraft"
                    width={92}
                    height={92}
                  />
                </div>
                <div className="text-right">
                  <div className="flex items-start justify-end pt-4 pr-4">
                    <span className="text-2xl font-bold text-black">$</span>
                    <span className="text-4xl font-bold text-black">1</span>
                    <span className="text-xl font-extrabold text-black align-super">
                      .00
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase pr-4 pt-1">
                    Per month
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 pt-4 pb-2">
                <h3 className="text-2xl font-semibold text-black mb-1 px-6">
                  Minecraft Servers
                </h3>
                <p className="text-gray-600 text-md mb-2 px-6">
                  Game servers managed via Pterodactyl Panel - instantly
                  deployed.
                </p>
              </div>
              <div className="flex-grow mb-2">
                <ul className="space-y-1 pl-8 pt-5 pb-4">
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      Pterodactyl Panel Beta
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Switch Between Games</span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      Global Locations Available
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      DDoS Protected Network
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Instant Setup</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8 text-center">
                <Button variant="minecraft" size="xl" className="text-xl">
                  See Plans
                </Button>
              </div>
            </div>
          </div>

          {/* Game/Application Servers */}
          <div className="bg-white border-gray-200 border-b lg:border-r lg:border-b-0 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-2">
                <div className="pl-4 pt-2 rounded flex-shrink-0">
                  <Image
                    src="/discordbot.png"
                    alt="Discord+Bot"
                    width={92}
                    height={92}
                  />
                </div>
                <div className="text-right">
                  <div className="flex items-start justify-end pt-4 pr-4">
                    <span className="text-2xl font-bold text-black">$</span>
                    <span className="text-4xl font-bold text-black">1</span>
                    <span className="text-xl font-extrabold text-black align-super">
                      .00
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase pr-4 pt-1">
                    Per month
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 pt-4 pb-2">
                <h3 className="text-2xl font-semibold text-black mb-1 px-6">
                  Game/Application Servers
                </h3>

                <p className="text-gray-600 text-md mb-2 px-6">
                  Game/Application servers managed via Pterodactyl Panel -
                  instantly deployed.
                </p>
              </div>
              <div className="flex-grow mb-2">
                <ul className="space-y-1 pl-8 pt-5 pb-4">
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      Pterodactyl Panel Beta
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Switch Between Games</span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      Global Locations Available
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      DDoS Protected Network
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Instant Setup</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8 text-center">
                <Button variant="classic" size="xl" className="text-xl">
                  See Plans
                </Button>
              </div>
            </div>
          </div>
          {/* Dedicated Servers */}
          <div className="bg-white border-gray-200 border-b md:border-b-0 md:border-r lg:border-r lg:border-b-0 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-2">
                <div className="pl-4 pt-2 rounded flex-shrink-0">
                  <Image
                    src="/web.png"
                    alt="Website Hosting"
                    width={92}
                    height={92}
                    className="p-1"
                  />
                </div>
                <div className="text-right">
                  <div className="flex items-start justify-end pt-4 pr-4">
                    <span className="text-2xl font-bold text-black">$</span>
                    <span className="text-4xl font-bold text-black">1</span>
                    <span className="text-xl font-extrabold text-black align-super">
                      .00
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase pr-4 pt-1">
                    Per month
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 pt-4 pb-2">
                <h3 className="text-2xl font-semibold text-black mb-1 px-6">
                  Website Hosting
                </h3>

                <p className="text-gray-600 text-md mb-2 px-6">
                  Shared hosting that supports PHP, Python, NodeJS,
                  and more.
                </p>
              </div>
              <div className="flex-grow mb-2">
                <ul className="space-y-1 pl-8 pt-5 pb-4">
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">cPanel control panel</span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      NodeJS, Ruby, Python, PHP, and more
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Wordpress Installer</span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      Managed by StylenHost LTD
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Instant Setup</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8 text-center">
                <Button variant="classic" size="xl" className="text-xl">
                  See Plans
                </Button>
              </div>
            </div>
          </div>
          {/* Private Cloud */}
          <div className="bg-white border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-2">
                <div className="pl-4 pt-2 rounded flex-shrink-0">
                  <Image
                    src="/cloud.png"
                    alt="Minecraft"
                    width={92}
                    height={92}
                  />
                </div>
                <div className="text-right">
                  <div className="flex items-start justify-end pt-4 pr-4">
                    <span className="text-xl font-extrabold text-black align-super">
                      Custom
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase pr-4 pt-1">
                    Per month
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 pt-4 pb-2">
                <h3 className="text-2xl font-semibold text-black mb-1 px-6">
                  Private Cloud
                </h3>

                <p className="text-gray-600 text-md mb-2 px-6">
                  Private cloud servers with dedicated resources in our private
                  cloud.
                </p>
              </div>
              <div className="flex-grow mb-2">
                <ul className="space-y-1 pl-8 pt-5 pb-4">
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      Proxmox VE Virtualization
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Dedicated Resources</span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Full Root Access</span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">
                      DDoS Protection Available
                    </span>
                  </li>
                  <li className="flex items-start text-md">
                    <span className="text-black mr-1 flex-shrink-0">+</span>
                    <span className="text-gray-700">Scalable Resources</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8 text-center">
                <Button variant="classic" size="xl" className="text-xl">
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
