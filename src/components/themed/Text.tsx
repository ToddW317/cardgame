import { Text as RNText, TextProps } from 'react-native';

export function Text(props: TextProps) {
  return (
    <RNText 
      {...props} 
      style={[
        { color: '#fff' }, // Default text color
        props.style
      ]}
    />
  );
} 