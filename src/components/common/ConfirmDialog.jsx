import { AlertDialog, Button, Flex } from '@radix-ui/themes';

export const ConfirmDialog = ({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  onConfirm, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {description}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {cancelText}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color={danger ? 'red' : 'blue'} onClick={onConfirm}>
              {confirmText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
