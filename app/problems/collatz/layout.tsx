import { I18nProvider } from '@/lib/i18n/context';

export default function CollatzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <I18nProvider>{children}</I18nProvider>;
}
