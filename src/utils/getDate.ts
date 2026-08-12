export const getDate = (d: Date) => {
  const month = d.toLocaleString("en-US", { month: "short" }); // "Aug"

  const day = d.getDate();

  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const timeZone = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  })
    .formatToParts(d)
    .find((part) => part.type === "timeZoneName")?.value ?? "";

    return { month, day, time, timeZone };
};
