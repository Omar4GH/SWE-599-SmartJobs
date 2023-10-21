import React from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';

const Home = () => {
  return (
<div className="flex flex-col items-center h-screen">
<div className="text-2xl mb-4">This is the start of SmartJobs</div>



  <Card
      variant="outlined"
      sx={{ width: 'max(400px, 60%)', borderRadius: 0, '--Card-radius': 0 }}
      className="w-full max-w-xl mb-4"
    >
      <CardContent orientation="horizontal">
        <Skeleton variant="rectangular" width={44} height={44} />
        <div>
          <Skeleton variant="text" width={100} />
          <Skeleton level="body-sm" variant="text" width={200} />
        </div>
      </CardContent>
      <CardContent sx={{ gap: 0.5, mt: 1 }}>
        <Skeleton level="body-xs" variant="text" width="92%" />
        <Skeleton level="body-xs" variant="text" width="99%" />
        <Skeleton level="body-xs" variant="text" width="96%" />
      </CardContent>
    </Card>

    <Card
      variant="outlined"
      sx={{ width: 'max(400px, 60%)', borderRadius: 0, '--Card-radius': 0 }}
      className="w-full max-w-xl mb-4"
    >
      <CardContent orientation="horizontal">
        <Skeleton variant="rectangular" width={44} height={44} />
        <div>
          <Skeleton variant="text" width={100} />
          <Skeleton level="body-sm" variant="text" width={200} />
        </div>
      </CardContent>
      <CardContent sx={{ gap: 0.5, mt: 1 }}>
        <Skeleton level="body-xs" variant="text" width="92%" />
        <Skeleton level="body-xs" variant="text" width="99%" />
        <Skeleton level="body-xs" variant="text" width="96%" />
      </CardContent>
    </Card>

    <Card
      variant="outlined"
      sx={{ width: 'max(400px, 60%)', borderRadius: 0, '--Card-radius': 0 }}
      className="w-full max-w-xl mb-4"
    >
      <CardContent orientation="horizontal">
        <Skeleton variant="rectangular" width={44} height={44} />
        <div>
          <Skeleton variant="text" width={100} />
          <Skeleton level="body-sm" variant="text" width={200} />
        </div>
      </CardContent>
      <CardContent sx={{ gap: 0.5, mt: 1 }}>
        <Skeleton level="body-xs" variant="text" width="92%" />
        <Skeleton level="body-xs" variant="text" width="99%" />
        <Skeleton level="body-xs" variant="text" width="96%" />
      </CardContent>
    </Card>
</div>

  );
};

export default Home;
