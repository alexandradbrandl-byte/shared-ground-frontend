const COLORS = ["#FF0018", "#FFA52C", "#FFFF41", "#008018", "#0000F9", "#86007D"];

const RainbowStripe = () => (
  <div className="w-full h-1 flex" aria-hidden="true">
    {COLORS.map((c) => (
      <div key={c} className="flex-1" style={{ backgroundColor: c }} />
    ))}
  </div>
);

export default RainbowStripe;
