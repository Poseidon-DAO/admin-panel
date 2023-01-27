import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Link,
  Box,
} from "@mui/material";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@mui/lab";
import Iconify from "src/components/Iconify";

import { getTransactionLink } from "src/utils/getTransactionLink";

import { fDateTime } from "../../../utils/formatTime";

type IProps = {
  title: string;
  subheader: string;
  list: {
    id: string;
    title: string;
    hash: string;
    type: string;
    time: Date | null;
  }[];
};

export default function OrderTimeline({ title, subheader, list }: IProps) {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Timeline style={{ minHeight: 363 }}>
          {list.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              isLast={index === list.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

type OrderItemProps = {
  item: {
    id: string;
    title: string;
    hash: string;
    type: string;
    time: Date | null;
  };
  isLast: boolean;
};

function OrderItem({ item, isLast }: OrderItemProps) {
  const { title, hash, time } = item;

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color="primary" />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle2">{title}</Typography>

          <Link
            href={getTransactionLink(hash)}
            variant="body2"
            target="_blank"
            display="flex"
            alignItems="center"
          >
            <Typography
              title={hash}
              variant="caption"
              marginLeft="10px"
              width="250px"
              overflow="hidden"
              noWrap
            >
              {hash}
            </Typography>
            <Iconify
              icon="material-symbols:open-in-new"
              sx={{ cursor: "pointer", marginLeft: 1 }}
            />
          </Link>
        </Box>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fDateTime(time!)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
