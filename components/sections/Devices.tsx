import { TabletFrame } from "@/components/device/DeviceFrames";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { devices } from "@/config/content";
import { mockups } from "@/lib/mockups";

export function Devices() {
  return (
    <section aria-labelledby="devices-title" className="mx-auto max-w-6xl px-8 py-20 md:px-6 md:py-28">
      <SectionHeading id="devices-title" eyebrow={devices.eyebrow} title={devices.title} align="center">
        <p>{devices.text}</p>
      </SectionHeading>
      <TabletFrame mockup={mockups.ipadSchule} className="mx-auto mt-10 hidden max-w-4xl md:block" />
      <p className="mt-6 text-center text-sm font-semibold text-ink-muted">🤖 {devices.more}</p>
    </section>
  );
}
