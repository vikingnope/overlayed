import { Download, Check, X } from "lucide-react";

import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import { useState } from "react";

export const UpdateBanner = () => {
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  return (
    <div className="py-2 h-[48px] bg-blue-500">
      {!confirmUpdate ? (
        <button
          onClick={() => {
            setConfirmUpdate(true);
          }}
          className="w-full"
        >
          <div className="!text-white font-bold cursor-pointer flex gap-2 items-center justify-center">
            <Download />
            <p>Update is available</p>
          </div>
        </button>
      ) : (
        <div className="px-4 justify-between flex items-center">
          <p className="font-bold">Confirm update</p>

          <div>
            <button
              onClick={() => {
                setConfirmUpdate(false);
              }}
              className="h-8 rounded-md px-2 hover:bg-blue-600"
            >
              <X size={20} />
            </button>
            <button
              onClick={async () => {
                const update = await checkUpdate();
                if (update.shouldUpdate) {
                  console.log("installing update");
                  try {
                    await installUpdate();
                    await relaunch();
                  } catch (e) {
                    console.error(e);
                  }
                }

                setConfirmUpdate(false);
              }}
              className="rounded-md px-2 h-8 ml-1 hover:bg-blue-600"
            >
              <Check size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};