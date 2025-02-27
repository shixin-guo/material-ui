import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { alpha } from '@mui/system';
import useThemeProps from '../styles/useThemeProps';
import paginationItemClasses, { getPaginationItemUtilityClass } from './paginationItemClasses';
import useTheme from '../styles/useTheme';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import FirstPageIcon from '../internal/svg-icons/FirstPage';
import LastPageIcon from '../internal/svg-icons/LastPage';
import NavigateBeforeIcon from '../internal/svg-icons/NavigateBefore';
import NavigateNextIcon from '../internal/svg-icons/NavigateNext';
import styled from '../styles/styled';

const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    styles[ownerState.variant],
    styles[`size${capitalize(ownerState.size)}`],
    ownerState.variant === 'text' && styles[`text${capitalize(ownerState.color)}`],
    ownerState.variant === 'outlined' && styles[`outlined${capitalize(ownerState.color)}`],
    ownerState.shape === 'rounded' && styles.rounded,
    ownerState.type === 'page' && styles.page,
    (ownerState.type === 'start-ellipsis' || ownerState.type === 'end-ellipsis') && styles.ellipsis,
    (ownerState.type === 'previous' || ownerState.type === 'next') && styles.previousNext,
    (ownerState.type === 'first' || ownerState.type === 'last') && styles.firstLast,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { classes, color, disabled, selected, size, shape, type, variant } = ownerState;

  const slots = {
    root: [
      'root',
      `size${capitalize(size)}`,
      variant,
      shape,
      color !== 'standard' && `${variant}${capitalize(color)}`,
      disabled && 'disabled',
      selected && 'selected',
      {
        page: 'page',
        first: 'firstLast',
        last: 'firstLast',
        'start-ellipsis': 'ellipsis',
        'end-ellipsis': 'ellipsis',
        previous: 'previousNext',
        next: 'previousNext',
      }[type],
    ],
    icon: ['icon'],
  };

  return composeClasses(slots, getPaginationItemUtilityClass, classes);
};

const PaginationItemEllipsis = styled('div', {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver,
})(({ theme, ownerState }) => ({
  ...theme.typography.body2,
  borderRadius: 32 / 2,
  textAlign: 'center',
  boxSizing: 'border-box',
  minWidth: 32,
  padding: '0 6px',
  margin: '0 3px',
  color: theme.palette.text.primary,
  height: 'auto',
  [`&.${paginationItemClasses.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity,
  },
  ...(ownerState.size === 'small' && {
    minWidth: 26,
    borderRadius: 26 / 2,
    margin: '0 1px',
    padding: '0 4px',
  }),
  ...(ownerState.size === 'large' && {
    minWidth: 40,
    borderRadius: 40 / 2,
    padding: '0 10px',
    fontSize: theme.typography.pxToRem(15),
  }),
}));

const PaginationItemPage = styled(ButtonBase, {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver,
})(
  ({ theme, ownerState }) => ({
    ...theme.typography.body2,
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    height: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: theme.palette.text.primary,
    [`&.${paginationItemClasses.focusVisible}`]: {
      backgroundColor: theme.palette.action.focus,
    },
    [`&.${paginationItemClasses.disabled}`]: {
      opacity: theme.palette.action.disabledOpacity,
    },
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    [`&.${paginationItemClasses.selected}`]: {
      backgroundColor: theme.palette.action.selected,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.action.selected,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.action.selected,
        },
      },
      [`&.${paginationItemClasses.focusVisible}`]: {
        backgroundColor: alpha(
          theme.palette.action.selected,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
      [`&.${paginationItemClasses.disabled}`]: {
        opacity: 1,
        color: theme.palette.action.disabled,
        backgroundColor: theme.palette.action.selected,
      },
    },
    ...(ownerState.size === 'small' && {
      minWidth: 26,
      height: 26,
      borderRadius: 26 / 2,
      margin: '0 1px',
      padding: '0 4px',
    }),
    ...(ownerState.size === 'large' && {
      minWidth: 40,
      height: 40,
      borderRadius: 40 / 2,
      padding: '0 10px',
      fontSize: theme.typography.pxToRem(15),
    }),
    ...(ownerState.shape === 'rounded' && {
      borderRadius: theme.shape.borderRadius,
    }),
  }),
  ({ theme, ownerState }) => ({
    ...(ownerState.variant === 'text' && {
      [`&.${paginationItemClasses.selected}`]: {
        ...(ownerState.color !== 'standard' && {
          color: theme.palette[ownerState.color].contrastText,
          backgroundColor: theme.palette[ownerState.color].main,
          '&:hover': {
            backgroundColor: theme.palette[ownerState.color].dark,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: theme.palette[ownerState.color].main,
            },
          },
          [`&.${paginationItemClasses.focusVisible}`]: {
            backgroundColor: theme.palette[ownerState.color].dark,
          },
        }),
        [`&.${paginationItemClasses.disabled}`]: {
          color: theme.palette.action.disabled,
        },
      },
    }),
    ...(ownerState.variant === 'outlined' && {
      border: `1px solid ${
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      }`,
      [`&.${paginationItemClasses.selected}`]: {
        ...(ownerState.color !== 'standard' && {
          color: theme.palette[ownerState.color].main,
          border: `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`,
          backgroundColor: alpha(
            theme.palette[ownerState.color].main,
            theme.palette.action.activatedOpacity,
          ),
          '&:hover': {
            backgroundColor: alpha(
              theme.palette[ownerState.color].main,
              theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity,
            ),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
          [`&.${paginationItemClasses.focusVisible}`]: {
            backgroundColor: alpha(
              theme.palette[ownerState.color].main,
              theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity,
            ),
          },
        }),
        [`&.${paginationItemClasses.disabled}`]: {
          borderColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        },
      },
    }),
  }),
);

const PaginationItemPageIcon = styled('div', {
  name: 'MuiPaginationItem',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon,
})(({ theme, ownerState }) => ({
  fontSize: theme.typography.pxToRem(20),
  margin: '0 -8px',
  ...(ownerState.size === 'small' && {
    fontSize: theme.typography.pxToRem(18),
  }),
  ...(ownerState.size === 'large' && {
    fontSize: theme.typography.pxToRem(22),
  }),
}));

const PaginationItem = React.forwardRef(function PaginationItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiPaginationItem' });
  const {
    className,
    color = 'standard',
    component,
    components = {
      first: FirstPageIcon,
      last: LastPageIcon,
      next: NavigateNextIcon,
      previous: NavigateBeforeIcon,
    },
    disabled = false,
    page,
    selected = false,
    shape = 'circular',
    size = 'medium',
    type = 'page',
    variant = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    disabled,
    selected,
    shape,
    size,
    type,
    variant,
  };

  const theme = useTheme();
  const classes = useUtilityClasses(ownerState);

  const normalizedIcons =
    theme.direction === 'rtl'
      ? {
          previous: components.next || NavigateNextIcon,
          next: components.previous || NavigateBeforeIcon,
          last: components.first || FirstPageIcon,
          first: components.last || LastPageIcon,
        }
      : {
          previous: components.previous || NavigateBeforeIcon,
          next: components.next || NavigateNextIcon,
          first: components.first || FirstPageIcon,
          last: components.last || LastPageIcon,
        };

  const Icon = normalizedIcons[type];

  return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
    <PaginationItemEllipsis
      ref={ref}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      …
    </PaginationItemEllipsis>
  ) : (
    <PaginationItemPage
      ref={ref}
      ownerState={ownerState}
      component={component}
      disabled={disabled}
      className={clsx(classes.root, className)}
      {...other}
    >
      {type === 'page' && page}
      {Icon ? (
        <PaginationItemPageIcon as={Icon} ownerState={ownerState} className={classes.icon} />
      ) : null}
    </PaginationItemPage>
  );
});

PaginationItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The active color.
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'standard']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for first, last, next & previous item type
   * @default {
   *   first: FirstPageIcon,
   *   last: LastPageIcon,
   *   next: NavigateNextIcon,
   *   previous: NavigateBeforeIcon,
   * }
   */
  components: PropTypes.shape({
    first: PropTypes.elementType,
    last: PropTypes.elementType,
    next: PropTypes.elementType,
    previous: PropTypes.elementType,
  }),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The current page number.
   */
  page: PropTypes.node,
  /**
   * If `true` the pagination item is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The shape of the pagination item.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The type of pagination item.
   * @default 'page'
   */
  type: PropTypes.oneOf([
    'end-ellipsis',
    'first',
    'last',
    'next',
    'page',
    'previous',
    'start-ellipsis',
  ]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'text']),
    PropTypes.string,
  ]),
};

export default PaginationItem;
