import goldStack from "../../../assets/gold-stack.png";

interface IProps {
  amount: number;
  setSelectedAmount: React.Dispatch<React.SetStateAction<number>>;
  selectedAmount: number | undefined;
}
export default function BetButton({
  amount = 100,
  setSelectedAmount,
  selectedAmount,
}: IProps) {
  function handleButton(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    ev.preventDefault();

    if (selectedAmount === amount) {
      setSelectedAmount(0);
    } else {
      setSelectedAmount(amount);
    }
  }
  return (
    <div
      onClick={(ev) => handleButton(ev)}
      className={`flex bg-[${
        selectedAmount === amount ? "#F5F5F5" : "#001F3F"
      }] w-[200px] h-[100%] border rounded-[10px] justify-around cursor-pointer select-none`}
    >
      <div className="w-[70px] h-[70px]">
        <img
          className={`${selectedAmount === amount ? "black" : "white-image"}`}
          src={goldStack}
          alt=""
        />
      </div>
      <div className={`h-[100] flex items-center w-[100px]`}>
        <span
          style={{
            color: selectedAmount === amount ? "gray" : "white",
          }}
        >
          BET {amount}$
        </span>
      </div>
    </div>
  );
}
