import { dateOfBirth } from "@/assets/svg/dateOfBirth";

interface DateOfBirthButtonProps {
  onClick?: () => void;
}

export function DateOfBirthButton({ onClick }: DateOfBirthButtonProps) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-[16px] w-95"
      data-name="Single large button"
    >
      <div
        className="basis-0 box-border content-stretch flex flex-row grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0 cursor-pointer"
        data-name="Button 1"
        onClick={onClick}
      >
        {/* Gradient border wrapper */}
        <div
          className="p-[2px] rounded-[101px] bg-gradient-to-r from-[#3070E7] to-[#16BDEB] w-full h-full relative group"
          style={{ minWidth: 0, minHeight: 0 }}
        >
          {/* Inner white content */}
          <div className="bg-white rounded-[100px] w-full h-full transition-shadow group-hover:shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]">
            <div className="box-border content-stretch flex flex-col items-center justify-center overflow-clip p-0 relative w-full">
              <div
                className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative shrink-0"
                data-name="State-layer"
              >
                {/* SVG Icon */}
                <span
                  className="mr-2 flex items-center"
                  dangerouslySetInnerHTML={{ __html: dateOfBirth }}
                  aria-hidden="true"
                />
                <div
                  className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#096dd9] text-[16px] text-left text-nowrap tracking-[0.15px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
                    Date of Birth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DateOfBirthButton;
