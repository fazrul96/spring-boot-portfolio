import React, {useState} from "react";
import {Badge, Button, Card, Chip, Grid, Stack, Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";

const WebtoonChapterList = ({
                         chapters,
                         availableChapters = [],
                         handleSync,
                         isFetching,
                         syncingChapter,
                         navigate,
                         title,
                     }) => {
    const [showAll, setShowAll] = useState(false);
    const isAvailable = (chapter) => {
        if (Array.isArray(availableChapters)) {
            const matchedChapter = availableChapters.find(
                (available) => available.chapter === chapter && (available.status === "COMPLETED" || available.status === "DEFAULT")
            );
            if (matchedChapter) {
                return {
                    isAvailable: true,
                    date: matchedChapter.updatedAt,
                };
            }
        }
        return {
            isAvailable: false,
            date: null,
        };
    };
    const visibleChapters = showAll ? chapters : chapters.slice(0, 12);
    return (
        <Grid container spacing={2}>
            {visibleChapters.map((chapter) => {
                const { isAvailable: isChapterAvailable, date } = isAvailable(chapter);
                return (
                    <Grid item xs={12} sm={6} md={6} lg={2} key={chapter}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    onClick={() => navigate(`/series/${title}/chapter-${chapter}`)}
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        transition: 'color 0.3s',
                                        '&:hover': {
                                            color: 'primary.main', // Slight color change on hover
                                        },
                                    }}
                                >
                                    Chapter {chapter}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ marginLeft: 2, alignItems: 'center' }}>
                                    <Tooltip title={isChapterAvailable ? 'Available' : 'Not Available'}>
                                        <Chip
                                            size="small"
                                            sx={{
                                                marginLeft: 1,
                                                backgroundColor: isChapterAvailable ? 'green' : 'gray',
                                                borderRadius: '50%',
                                                width: 16,
                                                height: 16,
                                                padding: 0,
                                            }}
                                        />
                                    </Tooltip>
                                    {!isChapterAvailable && (
                                        <Tooltip title="Syncing">
                                            <IconButton>
                                                <Badge
                                                    color="primary"
                                                    onClick={() => handleSync(chapter)}
                                                    disabled={isFetching || syncingChapter === chapter}
                                                    sx={{
                                                        borderColor: 'info.main',
                                                        color: syncingChapter === chapter ? 'orange' : 'info.main',
                                                    }}
                                                >
                                                    <SyncIcon
                                                        sx={{
                                                            animation:
                                                                syncingChapter === chapter
                                                                    ? 'spin 1s linear infinite'
                                                                    : 'none',
                                                            '@keyframes spin': {
                                                                from: { transform: 'rotate(0deg)' },
                                                                to: { transform: 'rotate(360deg)' },
                                                            },
                                                        }}
                                                    />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>
                            </Typography>
                            {isChapterAvailable && date && (
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem'}}>
                                    {new Intl.DateTimeFormat('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(new Date(date))}
                                </Typography>
                            )}
                        </Card>
                    </Grid>
                );
            })}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setShowAll(!showAll)}
                    sx={{ mt: 2 }}
                >
                    {showAll ? 'Show Less' : `Show All (${chapters.length - 10} more)`}
                </Button>
            </Grid>
        </Grid>
    );
};

export default WebtoonChapterList