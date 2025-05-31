import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href, Link } from 'expo-router';
import { SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { TextProps, ViewProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export type ExternalLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: Href & string;
};

export type IconMapping = Record<
  SymbolViewProps['name'],
  ComponentProps<typeof MaterialIcons>['name']
>;
export type IconSymbolName = keyof typeof MAPPING;
