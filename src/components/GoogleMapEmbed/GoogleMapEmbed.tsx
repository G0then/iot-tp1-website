type GoogleMapsEmbedProps = {
  latitude: number;
  longitude: number;
  customHeight?: string;
  customWidth?: string;
};

export const GoogleMapEmbed = (props: GoogleMapsEmbedProps) => {
  const { latitude, longitude, customHeight, customWidth } = props;
  return (
    <div className="min-h-full w-full">
      <iframe
        src={`https://www.google.com/maps/place?q=${latitude},${longitude}&hl=pt;&output=embed&z=12&t=d`}
        height={customHeight || "100%"}
        width={customWidth || "100%"}
        className="rounded-lg min-h-full w-full"
        aria-hidden="false"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
};
