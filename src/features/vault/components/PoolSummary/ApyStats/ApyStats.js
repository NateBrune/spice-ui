import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { formatApy } from '../../../../helpers/format';
import { isNaN } from '../../../../helpers/bignumber';
import LabeledStat from '../LabeledStat/LabeledStat';
import { Fade, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(styles);

const yearlyToDaily = apy => {
  const g = Math.pow(10, Math.log10(apy + 1) / 365) - 1;

  if (isNaN(g)) {
    return 0;
  }

  return g;
};

const BreakdownTooltip = memo(({ rows }) => {
  const classes = useStyles();

  return (
    <table>
      <tbody>
        {rows.map(row => (
          <tr key={row.label}>
            <th className={classes.label}>{row.label}</th>
            <td className={classes.value}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

const ApyTooltip = memo(({ rows }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.label} variant="body3">
        {'Based on the performance of the previous 7 days or since launch'}
      </Typography>
    </div>
  );
});

const YearlyBreakdownTooltip = memo(({ rates }) => {
  const rows = [];
  const { t } = useTranslation();

  if ('vaultApr' in rates) {
    rows.push({
      label: t('Vault-Breakdown-VaultApr'),
      value: rates.vaultApr,
    });
  }

  if ('tradingApr' in rates) {
    rows.push({
      label: t('Vault-Breakdown-TradingApr'),
      value: rates.tradingApr,
    });
  }

  if ('boostApr' in rates) {
    rows.push({
      label: t('Vault-Breakdown-BoostApr'),
      value: rates.boostApr,
    });
  }

  return <BreakdownTooltip rows={rows} />;
});

const DailyBreakdownTooltip = memo(({ rates }) => {
  const rows = [];
  const { t } = useTranslation();

  if ('vaultDaily' in rates) {
    rows.push({
      label: t('Vault-Breakdown-VaultDaily'),
      value: rates.vaultDaily,
    });
  }

  if ('tradingDaily' in rates) {
    rows.push({
      label: t('Vault-Breakdown-TradingDaily'),
      value: rates.tradingDaily,
    });
  }

  if ('boostDaily' in rates) {
    rows.push({
      label: t('Vault-Breakdown-BoostDaily'),
      value: rates.boostDaily,
    });
  }

  return <BreakdownTooltip rows={rows} />;
});

const LabeledStatWithTooltip = memo(({ tooltip, label, ...passthrough }) => {
  const classes = useStyles();

  return tooltip ? (
    <Tooltip
      arrow
      TransitionComponent={Fade}
      title={tooltip}
      placement="bottom"
      enterTouchDelay={0}
      leaveTouchDelay={3000}
      classes={{ tooltip: classes.tooltip }}
    >
      <LabeledStat
        label={
          <>
            {label} <i className="fas fa-info-circle" />
          </>
        }
        {...passthrough}
      />
    </Tooltip>
  ) : (
    <LabeledStat label={label} {...passthrough} />
  );
});

const ApyStats = ({ apy, launchpoolApr, isLoading = false, itemClasses, itemInnerClasses }) => {
  const { t } = useTranslation();
  const isBoosted = !!launchpoolApr;
  const values = {};
  let needsApyTooltip = false;
  let needsDailyTooltip = false;

  values.maxApy = apy.maxApy;
  values.apy24hrs = apy.apy24hrs;
  if (apy.apy7d)
    values.apy = apy.apy7d;
  else
    values.apy = apy.apy3d;
    

  if ('vaultApr' in apy && apy.vaultApr) {
    needsApyTooltip = true;
    values.vaultApr = apy.vaultApr;
    values.vaultDaily = apy.vaultApr / 365;
  }

  if ('tradingApr' in apy && apy.tradingApr) {
    needsApyTooltip = true;
    needsDailyTooltip = true;
    values.tradingApr = apy.tradingApr;
    values.tradingDaily = apy.tradingApr / 365;
  }

  if ('vaultAprDaily' in values || 'tradingAprDaily' in values) {
    values.totalDaily = (values.vaultDaily || 0) + (values.tradingDaily || 0);
  } else {
    values.totalDaily = yearlyToDaily(values.totalApy);
  }

  needsApyTooltip = true;
  needsDailyTooltip = true;
  if (isBoosted) {
    values.boostApr = launchpoolApr;
    values.boostDaily = launchpoolApr / 365;
    values.boostedTotalApy = values.boostApr ? values.totalApy + values.boostApr : 0;
    values.boostedTotalDaily = values.boostDaily ? values.totalDaily + values.boostDaily : 0;
  }

  const formatted = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, formatApy(value)])
  );

  return (
    <>
      <Grid item xs={4} className={itemClasses}>
        <LabeledStatWithTooltip
          value={formatted.apy}
          label={t('Vault-APYDaily')}
          tooltip={<ApyTooltip/>}
          boosted={isBoosted ? formatted.boostedTotalApy : ''}
          isLoading={isLoading}
          className={`tooltip-toggle ${itemInnerClasses}`}
        />
      </Grid>
    </>
  );
};

export default memo(ApyStats);
