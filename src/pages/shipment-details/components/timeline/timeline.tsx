import './styles.scss';

import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../../util/formatDate';

import { ShipmentResponse } from '../../../../types/shipment';
import { ShipmentState, ShipmentStatus } from '../../../../types/util';

import Stage from './stage';

const orderStatusClass = (state: ShipmentState) => {
  switch (state) {
    case ShipmentState.DELIVERED:
      return 'success';
    case ShipmentState.ON_HOLD:
      return 'pending';
    case ShipmentState.RETURNED:
      return 'pending';
    case ShipmentState.UNDER_REVIEW:
      return 'pending';
    default:
      return 'error';
  }
};

export default function Timeline({
  shipmentDetails,
}: {
  shipmentDetails?: ShipmentResponse;
}) {
  const { t } = useTranslation();

  const mainStages = [
    {
      order: 0,
      message: t('pages.shipments.timeline.stages.created'),
      class: 'success',
    },
    {
      order: 1,
      message: t('pages.shipments.timeline.stages.picked'),
      class: 'success',
    },
    {
      order: 2,
      message: t('pages.shipments.timeline.stages.enroute'),
      class: 'success',
    },
    {
      order: 3,
      message: t('pages.shipments.timeline.stages.delivered'),
      class: 'success',
    },
  ];

  const getCurrentStage = () => {
    const shipmentStatus = shipmentDetails?.CurrentStatus;
    if (!shipmentStatus)
      return {
        order: 3,
        message: t('pages.shipments.timeline.stages.review'),
        class: 'error',
      };

    switch (shipmentStatus.code) {
      case ShipmentState.UNDER_REVIEW:
        return {
          order: 0,
          message: t('pages.shipments.timeline.stages.review'),
          class: 'pending',
        };
      case ShipmentState.CREATED:
        return mainStages[0];
      case ShipmentState.PICKED:
        return mainStages[1];
      case ShipmentState.ENROUTE:
        return mainStages[2];
      case ShipmentState.DELIVERED:
        return {
          ...mainStages[3],
          order: 4,
        };
      case ShipmentState.RETURNED:
        return {
          order: 2,
          message: t('pages.shipments.timeline.stages.returned'),
          class: 'error',
        };
      case ShipmentState.ON_HOLD:
        return {
          order: 2,
          message: t('pages.shipments.timeline.stages.hold'),
          class: 'pending',
        };
      case ShipmentState.DELETED:
      case ShipmentState.CANCELLED:
        return {
          order: 4,
          message: t('pages.shipments.timeline.stages.cancelled'),
          class: 'error',
        };
      default:
        return {
          order: 4,
          message: t('pages.shipments.timeline.stages.review'),
          class: 'error',
        };
    }
  };

  const getLastMsg = () => {
    const transitEvents = shipmentDetails?.TransitEvents;
    const lastEventWithMsg = transitEvents
      ?.reverse()
      .find((event) => event.msg);

    return lastEventWithMsg?.msg;
  };

  return (
    shipmentDetails && (
      <section className={`container ${getCurrentStage().class}`}>
        <div className="infoSections">
          <div className="infoSection">
            <h3>
              {t('pages.shipments.timeline.shipmentNo', {
                shipmentId: shipmentDetails.TrackingNumber,
              })}
            </h3>
            <p>{shipmentDetails.CurrentStatus.state}</p>
          </div>
          <div className="infoSection">
            <h3>{t('pages.shipments.timeline.latestUpdate')}</h3>
            <p>
              {formatDate(shipmentDetails.CurrentStatus.timestamp).date} -
              {formatDate(shipmentDetails.CurrentStatus.timestamp).time}
            </p>
          </div>
          <div className="infoSection">
            <h3>{t('pages.shipments.timeline.merchant')}</h3>
            <p>{shipmentDetails.provider}</p>
          </div>
          <div className="infoSection">
            <h3>{t('pages.shipments.timeline.expectedDelivery')}</h3>
            <p>{formatDate(shipmentDetails.PromisedDate).date}</p>
          </div>
        </div>
        <div className="timelineSection">
          {mainStages.map((stage, index) => {
            return (
              <Stage
                key={index}
                stageData={{
                  order: stage.order,
                  message: stage.message,
                  currentStage: getCurrentStage().order,
                  msg: getLastMsg(),
                }}
              />
            );
          })}
        </div>
      </section>
    )
  );
}
