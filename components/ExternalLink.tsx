import { ExternalLinkProps } from '@/types/ui';
import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';

export function ExternalLink(props: ExternalLinkProps) {
  return (
    <Link
      target="_blank"
      {...props}
      onPress={async event => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(props.href);
        }
      }}
    />
  );
}
