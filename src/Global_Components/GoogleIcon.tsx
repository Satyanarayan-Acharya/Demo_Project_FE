import { Button, ButtonProps } from '@mantine/core';

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return <Button  variant="default" {...props} />;
}
